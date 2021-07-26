import TEMPLATE_URLS from '../data/template-repos'

const parseTemplateURL = (name: string) => {
    if (name in TEMPLATE_URLS) {
        return {
            name: name,
            repo: name,
            url: TEMPLATE_URLS[name],
        }
    }

    throw new Error('Invalid Template')
}

export default parseTemplateURL
