export default function paginate(itmes, perPageCount, currentPage){
    const currentIndex = (currentPage - 1) * perPageCount;
    return itmes.slice(currentIndex, currentIndex + perPageCount);
}