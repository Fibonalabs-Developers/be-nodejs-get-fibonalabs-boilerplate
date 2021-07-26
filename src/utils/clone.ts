import run from './run'

const clone = (dest: string, url: string) => {
    try {
        const cmd = run('git', ['clone', '--depth=1', url, dest])

        if (cmd.status == 0) {
            run('rm', ['-rf', `${dest}/.git`])
            return true
        }

        return false
    } catch (error) {
        throw new Error((error as any).toString())
    }
}

export default clone
