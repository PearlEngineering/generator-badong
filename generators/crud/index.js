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
        let me = this;
        let options = this.options;
        let args = { options }
        let subgens = [
            '../app-dto',
            '../domain',
            '../app-repo',
            '../infra-model',
            '../infra-repo',
            '../infra-serializer',
        ];
        
        subgens.forEach(subgen => me.composeWith(
            require.resolve(subgen), args)
        );

        const name = this.options.name;
        const nameDashSeparated = name.toLowerCase().replace(/[\W_]+/g,"-");
        const nameSnakeCase = name.toLowerCase().replace(/[\W_]+/g,"_");
        const nameCamelCase = _.camelCase(name);
        const namePascalCase = _.upperFirst(nameCamelCase);
        this.fs.copyTpl(
            glob.sync(this.templatePath('**'),
            { dot: true }), 
            this.destinationPath(), 
            {
                nameSnakeCase: nameSnakeCase,
                namePascalCase: namePascalCase,
                nameDashSeparated: nameDashSeparated
            }
        );

        let filename = this.destinationPath('app/infrastructure/views/__init__.py');
        fs.appendFileSync(filename, `from .${nameSnakeCase} import ${namePascalCase}ViewSet\n`);
        this.log(`${namePascalCase} was appended to ${filename}!`);

        // Register model to URLs
        filename = this.destinationPath('app/infrastructure/urls.py');

        let data = fs.readFileSync(filename).toString().split('\n');
        let insertIndex = data.indexOf('from rest_framework.routers import SimpleRouter') + 3;

        insertLine(filename)
            .contentSync(
                `from infrastructure.views.${nameSnakeCase} import ${namePascalCase}ViewSet`
                )
            .at(insertIndex);
            
        data = fs.readFileSync(filename).toString().split('\n');
        insertIndex = data.indexOf('router = SimpleRouter()') + 2;

        insertLine(filename)
            .contentSync(
                `router.register('${nameDashSeparated}s', ${namePascalCase}ViewSet)`
                )
            .at(insertIndex);
    }
};