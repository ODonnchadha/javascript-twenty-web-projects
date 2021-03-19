// 

const container = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('.filter');

let limit = 10;
let page = 1;

/*
  This function returns a Prommise. Thus, the async/await.
*/
async function getPosts() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
  const data = await response.json();

  return data;
}

function loading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');
    setTimeout(() => {
      page++;
      displayPosts();
    }, 300)
  }, 1000);
}

/* 
  Note: Posts need to be in the DOM to filter.
*/
function filterPosts(e) {
  const searchTerm = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(searchTerm) > -1 || body.indexOf(searchTerm) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  })
}

async function displayPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');

    postElement.innerHTML = `
      <div class="number">
        ${post.id}
      </div>
      <div class="post-info">
        <h2 class="post-title">
          ${post.title}
        </h2>
        <p class="post-body">
          ${post.body}
        </p>
      </div>`;

      container.appendChild(postElement);
  });
}

displayPosts();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    loading();
  }
});

window.addEventListener('input', (e) => {
  filterPosts(e);
});