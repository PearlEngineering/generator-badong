/**
 * Copyright 2020-2020 the original author or authors from the Badong project.
 *
 * This file is part of the Badong project, see https://www.badong.tech/
 * for more information.
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

let hasOptions = false;

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);
        this.options = opts.options || {};
        hasOptions = !_.isEmpty(this.options);

        console.log('constructor baz args: ', args)
        console.log('constructor baz opts: ', opts.options)
        console.log('constructor baz this.options: ', this.options)

        console.log('baz opts:', this.options) // ./. TEANA MO KA!
    }
    
    prompting() {
        // dont prompt if composed
        if(hasOptions) return;
        
        this.log('prompting - baz');
        this.log('prompting baz opts:', this.options)
    }

    writing() {
        this.log('writing - baz');
        this.log('writing baz opts:', this.options)
        // this.log('baz.answers.fooName:', this.answers.fooName);
    }
};