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
const path = require('path');

module.exports = {
    askForFooName
};

/**
 * @returns default foo name
 */
function getDefaultFooName() {
    return 'badongFoo';
}

/**
 * Ask a prompt for foo name.
 *
 * @param {object} generator - generator instance to use
 */
async function askForFooName(generator) {
    generator.options = await generator.prompt({
        type: 'input',
        name: 'fooName',
        validate: input => {
            if (input.length < 1) {
                return 'Foo name required';
            }
            if (!/^([a-zA-Z0-9_]*)$/.test(input)) {
                return 'Your foo name cannot contain special characters or a blank space';
            }
            return true;
        },
        message: 'What is the foo name to scaffold?',
        default: getDefaultFooName()
    });
}