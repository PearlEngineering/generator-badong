// *
//  * Copyright 2020-2020 the original author or authors from the Badong project.
//  *
//  * This file is part of the Badong project, see https://www.badong.tech/
//  * for more information.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *      http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
 
const Generator = require('yeoman-generator');
const glob = require('glob');

const prompts = require('./prompts');

module.exports = class extends Generator {

    initializing() {
        this.log('initializing - foo');
    }
    
    async prompting() {
        this.log('prompting - foo');

        let generator = this;
        
        await Promise.all([
            prompts.askForFooName(generator)
        ]);

        let options = this.options;

        this.log('prompting - options:', this.options);
        this.log('prompting - options:', Object.prototype.toString.call(this.options));
        
        this.log('prompting - foo.options.fooName:', this.options.fooName);

        // this.composeWith(require.resolve('../bar'), { options });
        // this.composeWith(require.resolve('../baz'), { options });

        this.composeWith(require.resolve('../bar'), {
          options
        });
        this.composeWith(require.resolve('../baz'), {
          options
        });
    }

    writing() {
        this.log('writing - foo');
        this.log('foo.options.fooName:', this.options.fooName);
    }
};