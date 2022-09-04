const loadData = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch (url);
    const data = await res.json();
    setMenus(data.data.news_category);
}

const setMenus = async (categories) => {
    const menus = document.getElementById('news-category');

    categories.forEach(item => {
        const ul = document.createElement('ul');
        ul.classList.add('menu', 'menu-horizontal', 'rounded', 'gap-4');
        ul.innerHTML = `
            <li><a onclick="loadCategoryData('${item.category_id}')">${item.category_name}</a></li>
        `;
        menus.appendChild(ul);
    });
}
// loadData();

const loadCategoryData = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id}`
    const res = await fetch(url);
    const data = await res.json();
    showCatDetails(data.data);
    console.log(data.data);
}
const showCatDetails = async (detail) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
    detail.forEach(detail => {
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('card', 'bg-base-100', 'shadow-xl', 'lg:card-side');
        detailsDiv.innerHTML = `
            <img src="${detail.thumbnail_url}" class="w-full h-full" alt="Album">
            <div class="card-body">
            <div>
                <h2 class="card-title">${detail.title}</h2>
                <p>${detail.details.length > 300 ? detail.details.slice(0, 300)+"..." : detail.details  }</p>
            </div>
            <div class="card-actions justify-between">
                <div class="flex">
                <div class="avatar">
                    <div class="w-12 rounded-full">
                    <img src="${detail.author.img}" />
                    </div>
                </div>
                <div class="ml-5">
                    <h3>${detail.author.name}</h3>
                    <p>${detail.author.published_date }</p>
                </div>
                </div>
                <div>
                <div class="stat flex">
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <div class="stat-value text-secondary text-2xl">
                    ${detail.total_view}
                    </div>
                </div>
                </div>
            <div class="rating text-2xl">
                <input type="radio" name="rating-1" class="mask mask-star" />
                <input type="radio" name="rating-1" class="mask mask-star" checked />
                <input type="radio" name="rating-1" class="mask mask-star" />
            </div>
            <div>
                <label onclick="loadDetailsData('${news_id}')" id="show-details" for="my-modal-3" class="btn">Show Details</label>
            </div>
            <div>
                <button   class=""><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" class="w-10 h-10">
                <path fill-rule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                </svg>
                </button>
            </div>
            </div>
        </div>
        `;
        detailsContainer.appendChild(detailsDiv);
    });
} 

const loadDetailsData = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a/0${news_id}`
    const res = await fetch(url);
    const data = await res.json();
    showAllDetailsNews(data.data);
    // console.log(data.data);
}

const showAllDetailsNews = async (detail) => {
    const detailsContainer = document.getElementById('show-details');
    detail.forEach(detail => {

        detailsContainer.innerHTML = `
          <img src="${detail.thumbnail_url}">
          <h3 class="text-lg font-bold">${detail.title}</h3>
          <p class="py-4">${detail.details.length > 300 ? detail.details.slice(0, 200)+"..." : detail.details  }</p>
          <h3>${detail.author.name}</h3>
            <p>${detail.author.published_date }</p>
        </div>
      </div>
        `;
    });
} 
loadData('08');


