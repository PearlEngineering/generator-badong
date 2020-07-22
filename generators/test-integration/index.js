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

let hasOptions = false;

const prompts = require('./../../prompts');

module.exports = class extends Generator {
    
    constructor(args, opts) {
        super(args, opts);
        this.options = opts.options || {};
        hasOptions = !_.isEmpty(this.options);
    }

    async prompting() {
        if(hasOptions) return;

        let generator = this;
        
        await Promise.all([
            prompts.askForName(generator)
        ]);
    }

    writing() {
        const name = this.options.name;
        const nameSnakeCase = name.toLowerCase().replace(/[\W_]+/g,"_");
        const nameCamelCase = _.camelCase(name);
        const namePascalCase = _.upperFirst(nameCamelCase);
        const parentFolderName = this.destinationPath().split('/').slice(-1)[0];
        this.fs.copyTpl(
            glob.sync(this.templatePath('**'),
            { dot: true }), 
            this.destinationPath(), 
            {
                nameSnakeCase: nameSnakeCase,
                namePascalCase: namePascalCase,
                parentFolderName: parentFolderName
            }
        );

        // Add steps to tests
        // TODO: Refactor me
        let filename = this.destinationPath('tests/features/conftest.py');
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