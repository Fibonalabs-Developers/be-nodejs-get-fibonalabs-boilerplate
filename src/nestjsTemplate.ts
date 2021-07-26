import prompts from 'prompts'
import { validateNpmName } from './utils/validate-pkg'
import path from 'path'
import message from './utils/message'
import { createApp } from './create-app/nestjs'
import parseTemplateURL from './utils/template-config'

async function run(projectName: string): Promise<void> {
    console.log(projectName)
    const res = await prompts([
        {
            type: 'select',
            name: 'db',
            message: 'Which DB would you like to use?',
            choices: [
                {
                    title: 'MySQL',
                    description: 'MySQL',
                    value: 'mysql',
                },
                {
                    title: 'PostgreSQL',
                    description: 'PostgreSQL',
                    value: 'postgresql',
                    disabled: true,
                },
            ],
            initial: 0,
        },
        {
            type: 'select',
            name: 'serverType',
            message: 'Which deployment method would you like to use?',
            choices: [
                {
                    title: 'Containerized',
                    description: 'Containerized Docker Application',
                    value: 'containerized',
                },
                {
                    title: 'Serverless',
                    description: 'Serverless',
                    value: 'serverless',
                },
            ],
            initial: 0,
        },
    ])

    let templateName = 'nestjs_' + res.serverType
    templateName = templateName.toLowerCase().trim()
    const template = parseTemplateURL(templateName)

    createApp({
        appPath: projectName,
        useNpm: true,
        template,
        database: res.db,
    })
}

export default run
