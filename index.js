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

    if(data.data.length > 0){
        cardContainer.classList.remove('flex', 'flex-col', 'justify-center', 'items-center', 'mt-6')
        cardContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4','gap-4', 'md:gap-2', 'mt-7', 'mb-12');

        data.data?.forEach((cardItem) => {
            const postedDate = cardItem.others?.posted_date ? parseInt(cardItem.others.posted_date)/60 : null;
            console.log(cardItem.others?.posted_date)

            const div = document.createElement('div');
            div.innerHTML = `
                <div class="px-2 mb-2">
                    <div class="relative">
                            <img class="relative w-full h-[200px] rounded-md" src="${cardItem.thumbnail}" alt="Shoes" />
                            <p class="absolute z-10 right-0 top-[85%] text-xs text-white bg-black rounded-md px-2 mr-2"> 
                            ${ postedDate !== null ? 
                                `${Math.floor(postedDate/60)} hrs ${(postedDate - (Math.floor(postedDate/60)*60)).toFixed(0)} min ago`: ''}
                         </p>
    
                    </div> 
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

    else{
        cardContainer.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4','gap-4', 'md:gap-2', 'mt-7', 'mb-12');
        cardContainer.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'mt-6')

        cardContainer.innerHTML = `
            <img src="./Icon.png" alt="Shoes" draggable='false'/>
            <h2 class="text-2xl font-bold my-8">Oops!! Sorry, There is no <br><span class="ml-16">content here</span></h2>  
        `
    }
}

const compareByViews = (a, b) => {
    const viewsA = parseInt(a.others.views.replace(/[^\d]/g, ''), 10); 
    const viewsB = parseInt(b.others.views.replace(/[^\d]/g, ''), 10);

    return (viewsB - viewsA);
}

const sortByViews = () => {
    const sortBtn = document.getElementById('sort-btn');
    sortBtn.classList.add('bg-[#FF1F3D]', 'text-white');

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

    const sortBtn = document.getElementById('sort-btn');
    sortBtn.classList.remove('bg-[#FF1F3D]', 'text-white');
}

handleCategory();
handleLoadCategory('1000', null);

