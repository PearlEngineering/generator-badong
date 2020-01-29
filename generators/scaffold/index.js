/**
 * Copyright 2020-2020 the original author or authors from the Badong project.
 *
 * This file is part of the Badong project.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Generator = require('yeoman-generator');
const glob = require('glob');
const _ = require('lodash');
const fs = require('fs');
const insertLine = require('insert-line');

const prompts = require('./prompts');

module.exports = class extends Generator {
    

    async prompting() {
        let generator = this;
        
        await Promise.all([
            prompts.askForModelName(generator)
        ]);
    }

    writing() {
        // copy all template files and folder structure
        const parentFolderName = this.destinationPath().split('/').slice(-1)[0] 
        const nameSnakeCase = this.options.modelName.toLowerCase().replace(/[\W_]+/g,"_");
        const nameDashSeparated = this.options.modelName.toLowerCase().replace(/[\W_]+/g,"-");
        const nameCamelCase = _.camelCase(this.options.modelName);
        const namePascalCase = _.upperFirst(nameCamelCase);
        this.fs.copyTpl(
            glob.sync(this.templatePath('**/*'), { dot: true }), 
            this.destinationPath(), 
            {
                name: this.options.modelName,
                nameDashSeparated: nameDashSeparated,
                nameSnakeCase: nameSnakeCase,
                nameCamelCase: nameCamelCase,
                namePascalCase: namePascalCase
            }
        );

        // Add new model to domains
        // TODO: Refactor me, compose instead
        let filename = this.destinationPath('app/domain/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        filename = this.destinationPath('app/application/repositories/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}Repository\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        filename = this.destinationPath('app/infrastructure/models/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}Model, ${namePascalCase}Manager\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        filename = this.destinationPath('app/infrastructure/modules/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}Module\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        filename = this.destinationPath('app/infrastructure/serializers/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}Serializer\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        filename = this.destinationPath('app/infrastructure/views/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}ViewsAPI\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        // Register models to django
        filename = this.destinationPath('app/infrastructure/admin.py');
        let data = fs.readFileSync(filename).toString().split('\n');
        let insertIndex = data.indexOf('# Import your models here.') + 2;

        insertLine(filename)
            .contentSync(`from .models import ${namePascalCase}Model\n`)
            .at(insertIndex);

        data = fs.readFileSync(filename).toString().split('\n');
        insertIndex = data.indexOf('# Register your models here.') + 2;
        insertLine(filename)
            .contentSync(`admin.site.register(${namePascalCase}Model)\n`)
            .at(insertIndex);
        
        this.log(`Registered ${namePascalCase} Model to Django admin`)

        // Register model to URLs
        filename = this.destinationPath('app/infrastructure/urls.py');
        data = fs.readFileSync(filename).toString().split('\n');
        insertIndex = data.indexOf('from rest_framework.routers import SimpleRouter') + 3;

        insertLine(filename)
            .contentSync(
                `from infrastructure.views.${nameSnakeCase} import ${namePascalCase}ViewsAPI\n`
                )
            .at(insertIndex);

        data = fs.readFileSync(filename).toString().split('\n');
        insertIndex = data.indexOf('urlpatterns = [') + 2;
        insertLine(filename)                
            .contentSync(
                `\tpath('${nameDashSeparated}s/<int:${nameSnakeCase}_id>', ${namePascalCase}ViewsAPI.as_view()),\n` +
                `\tpath('${nameDashSeparated}s/', ${namePascalCase}ViewsAPI.as_view()),\n`
                )
            .at(insertIndex);
        
        this.log(`Registered ${namePascalCase} to ${filename}!`)

        // Register model module
        filename = this.destinationPath(`app/${parentFolderName.replace(/[\W_]+/g,"_")}/settings.py`);
        data = fs.readFileSync(filename).toString().split('\n');
        insertIndex = data.indexOf('INJECTOR_MODULES = [') + 2;

        insertLine(filename)
            .contentSync(
                `    "infrastructure.modules.${namePascalCase}Module",`
                )
            .at(insertIndex);

        
        this.log(`Registered ${namePascalCase} to ${filename}!`)

        // Add steps to tests
        // TODO: Refactor me
        filename = this.destinationPath('tests/features/conftest.py');
        fs.appendFileSync(filename,
            `@pytest.fixture\n` +
            `def ${nameSnakeCase}_in_test():\n` +
            `    return {'${nameSnakeCase}': {}}\n`);

        filename = this.destinationPath('tests/features/steps/given.py');
        fs.appendFileSync(filename,
            `@given('I dont have an ${nameSnakeCase}')\n` +
            `def given_existing_cbs_${nameSnakeCase}(${nameSnakeCase}_in_test):\n` +
            `   ${nameSnakeCase}_in_test['${nameSnakeCase}'] = {\n` +
            `       '${nameSnakeCase}_id': '-1'\n` +
            `    }\n`);

        filename = this.destinationPath('tests/features/steps/then.py');
        fs.appendFileSync(filename,
            `@then('I should have the correct response')\n` +
            `def then_correct_response():\n` +
            `    print('then_correct_response')\n` +
            `    pass\n`);

        filename = this.destinationPath('tests/features/steps/when.py');
        fs.appendFileSync(filename,
            `@when('I get my ${nameSnakeCase}')\n` +
            `def given_get_${nameSnakeCase}(${nameSnakeCase}_in_test):\n` +
            `   ${nameSnakeCase}_id = ${nameSnakeCase}_in_test['${nameSnakeCase}']['${nameSnakeCase}_id']\n` +
            `\n` +
            `   print('${nameSnakeCase}_id:', ${nameSnakeCase}_id)\n` +
            `\n` +
            `   ${nameSnakeCase}_api_path = f'localhost:8080/${nameSnakeCase}s/{${nameSnakeCase}_id}'\n` +
            `\n` +
            `   # response = requests.get(${nameSnakeCase}_api_path, headers=headers, verify=False)\n` +
            `\n` +
            `   pass\n`);
    }
};