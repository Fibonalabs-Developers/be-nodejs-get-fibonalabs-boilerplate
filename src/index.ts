import message from './utils/message'
import prompts from 'prompts'
import { validateNpmName } from './utils/validate-pkg'
import path from 'path'
import nestjsTemplate from './nestjsTemplate'
import chalk from 'chalk'

let projectPath: string = ''

const program = {
    name: () => 'create-fibonalabs-be',
}

async function run(): Promise<void> {
    if (typeof projectPath === 'string') {
        projectPath = projectPath.trim()
    }

    if (!projectPath) {
        const res = await prompts([
            {
                type: 'text',
                name: 'projectName',
                message: message.projectNameQuestion,
                initial: message.projectNameDefaultValue,
                validate: (name: string) => {
                    const validation = validateNpmName(
                        path.basename(path.resolve(name))
                    )
                    if (validation.valid) {
                        return true
                    }
                    return 'Invalid project name: ' + validation.problems![0]
                },
            },
            {
                type: 'select',
                name: 'nodeFramework',
                message: 'Which Framework would you like to use?',
                choices: [
                    {
                        title: 'NestJS',
                        description: 'NestJS',
                        value: 'nestjs',
                    },
                    {
                        title: 'NodeJS',
                        description: 'NodeJS',
                        value: 'nodejs',
                        disabled: true,
                    },
                ],
                initial: 0,
            },
        ])

        if (typeof res.projectName === 'string') {
            projectPath = res.projectName.trim()
        }

        if (!projectPath) {
            console.log()
            console.log('Please specify the project directory:')
            console.log(
                `  ${chalk.cyan(program.name())} ${chalk.green(
                    '<project-directory>'
                )}`
            )
            console.log()
            console.log('For example:')
            console.log(
                `  ${chalk.cyan(program.name())} ${chalk.green(
                    message.projectNameDefaultValue
                )}`
            )
            console.log()
            process.exit(1)
        }

        const resolvedProjectPath = path.resolve(projectPath)
        const projectName = path.basename(resolvedProjectPath)

        const { valid, problems } = validateNpmName(projectName)

        if (!valid) {
            console.error(
                `Could not create a project called ${chalk.red(
                    `"${projectName}"`
                )} because of npm naming restrictions:`
            )

            problems!.forEach((p) =>
                console.error(`    ${chalk.red.bold('*')} ${p}`)
            )
            process.exit(1)
        }

        if (res.nodeFramework === 'nestjs') {
            nestjsTemplate(projectPath)
        }
    }
}

run()
    .then(() => {})
    .catch(async (reason) => {
        console.log()
        console.log('Aborting installation.')
    })
