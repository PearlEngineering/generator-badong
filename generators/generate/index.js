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

const prompts = require('./../../prompts');

module.exports = class extends Generator {
    
    async prompting() {
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
            '../app-service',
            '../app-use-case',
            '../infra-model',
            '../infra-module',
            '../infra-repo',
            '../infra-serializer',
            '../infra-service',
            '../infra-view',
            '../test-component'
        ];
        
        subgens.forEach(subgen => me.composeWith(
            require.resolve(subgen), args)
        );
    }
};