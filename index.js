var sortedData;

const handleCategory = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');
    data.data.forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <a onclick="handleLoadCategory('${category.category_id}', this)" id="${category.category}" class="tab rounded-sm px-4 font-medium text-base">${category.category}</a>
        `

        tabContainer.appendChild(div);
    })

    const defaultTab = document.getElementById('All');

    defaultTab.classList.add('selected');

}

const showData = (data) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    data.data?.forEach((cardItem) => {
        // console.log(cardItem);
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="pr-2">
                <figure><img class="w-full h-[200px] rounded-md" src="${cardItem.thumbnail}" alt="Shoes" /></figure>
                <div>
                    <div class="flex flex-row gap-3 mt-2">
                        <img class="w-[40px] h-[40px] rounded-full" src="${cardItem?.authors[0]?.profile_picture}" alt="Shoes" />
                        <div class="flex flex-col gap-2">
                            <h2 class="font-bold text-base">${cardItem.title}</h2>
                            <div class="font-normal text-sm text-[#171717B3]">
                                <p>${cardItem?.authors[0]?.verified ? `
                                    <div class="flex flex-row gap-[5px] pb-2">
                                        <p>${cardItem?.authors[0]?.profile_name}</p>
                                        <img class="w-[20px] h-[20px]" src="./blue-tick.jpg"
                                    </div>` :
                                         `${cardItem?.authors[0]?.profile_name}`
                                    }
                                </p>
                            </div>
                            <p class="font-normal text-sm text-[#171717B3]">${cardItem.others?.views} views</p>
                        </div>
                    </div>
                </div>

            </div>`

        cardContainer.appendChild(div);
    })
}

const compareByViews = (a, b) => {
    const viewsA = parseInt(a.others.views.replace(/[^\d]/g, ''), 10); 
    const viewsB = parseInt(b.others.views.replace(/[^\d]/g, ''), 10);

    return (viewsB - viewsA);
}

const sortByViews = () => {
    sortedData.data.sort(compareByViews);
    console.log(sortedData.data);
    showData(sortedData);
}

const handleLoadCategory = async (categoryID, selectedTab) => {

    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await response.json();

    showData(data);
    sortedData = data;

    const tabContainer = document.getElementById('tab-container');

    if (selectedTab !== null) {
        const tabs = tabContainer.querySelectorAll('.tab');
        tabs.forEach(tab => tab.classList.remove('selected'));

        selectedTab.classList.add('selected');
    }
}

handleCategory();
handleLoadCategory('1000', null);

