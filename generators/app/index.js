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
const fs = require('fs');
const insertLine = require('insert-line');

const prompts = require('./prompts');

module.exports = class extends Generator {
    
    async prompting() {
        let generator = this;
        
        await Promise.all([
            prompts.askForAppName(generator)
        ]);
    }

    writing() {
        const appName = this.options.appName.toLowerCase().replace(/[\W_]+/g,"_");
        const nameDashSeparated = this.options.appName.toLowerCase().replace(/[^0-9a-zA-Z]+/g,"-");
        const parentFolderName = this.destinationPath().split('/').slice(-1)[0];

        // copy all template files and folder structure
        this.fs.copyTpl(
            glob.sync(this.templatePath('**/*'), { dot: true }), 
            this.destinationPath(`${nameDashSeparated}/`), 
            {
                name: appName,
                nameDashSeparated: nameDashSeparated
            }
        );


        // Integrate microservice with ingress cluster
        let filename = this.destinationPath(`local-ingress.yaml`);
        let data = fs.readFileSync(filename).toString().split('\n');
        let insertIndex = data.indexOf('        paths:') + 2;

        insertLine(filename)
            .contentSync(
                `          - path: /${nameDashSeparated}-api
            backend:
              serviceName: ${nameDashSeparated}
              servicePort: 8081`
                )
            .at(insertIndex);

        // Integrate microservice with skaffold
        filename = this.destinationPath(`skaffold.yaml`);
        data = fs.readFileSync(filename).toString().split('\n');
        
        insertIndex = data.indexOf('  artifacts:') + 2;

        insertLine(filename)
            .contentSync(
                `    - image: ${nameDashSeparated}
      context: ${nameDashSeparated}`
                )
            .at(insertIndex);

        data = fs.readFileSync(filename).toString().split('\n');
        insertIndex = data.indexOf('    manifests:') + 2;

        insertLine(filename)
            .contentSync(
                `      - ${nameDashSeparated}/k8s/dev/*.yaml`
                )
            .at(insertIndex);
    }
};