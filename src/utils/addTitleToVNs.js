import vndbRepository from "../repositories/vndbRepository.js"

const addTitle = async (visualNovelsRaw) => {
    const visualNovels = [];
    for(const visualNovel of visualNovelsRaw)
    {
        const title = await vndbRepository.find(visualNovel.code, 'title');
        visualNovels.push({
            'code': visualNovel.code,
            'title': (title === null) ? '-' : title.title
        });
    }
    return visualNovels;
}

export default addTitle;