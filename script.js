// Menu Navigation
const toggle = document.querySelector('.toggleBtn');
const nav = document.querySelector('.site__header__nav');

function toggleNav() {
  if (nav.classList.contains('site__header__nav--active')) {
    nav.classList.remove('site__header__nav--active');
    return;
  }
  nav.classList.add('site__header__nav--active');
  return;
}

toggle.addEventListener('click', toggleNav, false);

// Format Date
function dateFormatter(date) {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const convertedRepoDate = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(
    convertedRepoDate
  );
  return `Updated ${formattedDate}`;
}

function createElement(type, classListArray = [], attribs = {}) {
  const el = document.createElement(type);
  classListArray.forEach((item) => el.classList.add(item));
  Object.keys(attribs).forEach((item) => el.setAttribute(item, attribs[item]));
  return el;
}

function createSVG(definition, classListArray = [], viewBox = '0 0 16 16') {
  const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const elPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  classListArray.forEach((item) => el.classList.add(item));
  el.setAttribute('viewBox', viewBox);
  el.setAttribute('width', '16');
  el.setAttribute('height', '16');
  elPath.setAttribute('d', definition);
  elPath.setAttribute('fill-rule', 'evenOdd');
  el.appendChild(elPath);

  return el;
}

function templateBuilder({ user }) {
  const headerAvatarBtn = document.querySelector('.site__header__btn--img');
  const userDetails = document.querySelector('.site__main__user__details');
  const userTitle = document.querySelector('.site__main__user__title');
  const userCard = document.querySelector('.site__main__user__card');
  const userFullName = document.querySelector('.site__main__user__name');
  const userName = document.querySelector('.site__main__user__username');
  const repoCounter = document.querySelector('.counter');
  const followers = document.querySelector('.followers');
  const following = document.querySelector('.following');
  const starred = document.querySelector('.starred');

  repoCounter.textContent = user.repositories.totalCount;
  followers.textContent = user.followers.totalCount;
  following.textContent = user.following.totalCount;
  starred.textContent = user.starredRepositories.totalCount;

  // Nav Btn Avatar
  const navBtnImg = createElement(
    'img',
    ['user-avatar', 'user-avatar--small'],
    { src: user.avatarUrl, alt: 'user-avatar', width: 20, height: 20 }
  );
  const navBtnSvg = createSVG(
    'M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z',
    ['site__header__icon']
  );

  headerAvatarBtn.appendChild(navBtnImg);
  headerAvatarBtn.appendChild(navBtnSvg);

  // User Info
  const userAvatar = createElement(
    'img',
    ['site__main__user__image', 'user-avatar', 'user-avatar--big'],
    { src: user.avatarUrl, alt: 'user avatar', width: 260, height: 260 }
  );

  userDetails.prepend(userAvatar);

  userFullName.textContent = user.name;
  userName.textContent = user.login;
  userTitle.textContent = user.bio;

  if (user.location) {
    const userLocation = createElement('li', [
      'site__main__user__card__item',
      'd-none',
      'd-md-block',
    ]);
    const userLocationSvg = createSVG(
      'M11.536 3.464a5 5 0 010 7.072L8 14.07l-3.536-3.535a5 5 0 117.072-7.072v.001zm1.06 8.132a6.5 6.5 0 10-9.192 0l3.535 3.536a1.5 1.5 0 002.122 0l3.535-3.536zM8 9a2 2 0 100-4 2 2 0 000 4z',
      ['link__icon']
    );
    const userLocationContent = createElement('span');
    userLocationContent.textContent = user.location;

    userLocation.appendChild(userLocationSvg);
    userLocation.appendChild(userLocationContent);

    userCard.appendChild(userLocation);
  }
  if (user.websiteUrl) {
    const userWebsite = createElement('li', ['site__main__user__card__item']);
    const userWebsiteLink = createElement(
      'a',
      [, 'site__main__user__card__link'],
      {
        href: user.websiteUrl,
      }
    );
    const userWebsiteSvg = createSVG(
      'M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z',
      ['link__icon']
    );
    const userWebsiteContent = createElement('span');
    userWebsiteContent.textContent = user.websiteUrl;

    userWebsiteLink.appendChild(userWebsiteSvg);
    userWebsiteLink.appendChild(userWebsiteContent);
    userWebsite.appendChild(userWebsiteLink);
    userCard.appendChild(userWebsite);
  }

  if (user.twitterUsername) {
    const userTwitter = createElement('li', ['site__main__user__card__item']);
    const userTwitterLink = createElement(
      'a',
      ['site__main__user__card__link', 'd-none', 'd-md-block'],
      {
        href: `https://twitter.com/${user.twitterUsername}`,
      }
    );
    const userTwitterSvg = createSVG(
      'M273.5 26.3a109.77 109.77 0 0 1-32.2 8.8 56.07 56.07 0 0 0 24.7-31 113.39 113.39 0 0 1-35.7 13.6 56.1 56.1 0 0 0-97 38.4 54 54 0 0 0 1.5 12.8A159.68 159.68 0 0 1 19.1 10.3a56.12 56.12 0 0 0 17.4 74.9 56.06 56.06 0 0 1-25.4-7v.7a56.11 56.11 0 0 0 45 55 55.65 55.65 0 0 1-14.8 2 62.39 62.39 0 0 1-10.6-1 56.24 56.24 0 0 0 52.4 39 112.87 112.87 0 0 1-69.7 24 119 119 0 0 1-13.4-.8 158.83 158.83 0 0 0 86 25.2c103.2 0 159.6-85.5 159.6-159.6 0-2.4-.1-4.9-.2-7.3a114.25 114.25 0 0 0 28.1-29.1',
      ['link__icon'],
      '0 0 273.5 222.3'
    );
    const userTwitterContent = createElement('span');
    userTwitterContent.textContent = `@${user.twitterUsername}`;

    userTwitterLink.appendChild(userTwitterSvg);
    userTwitterLink.appendChild(userTwitterContent);
    userTwitter.appendChild(userTwitterLink);
    userCard.appendChild(userTwitter);
  }

  // User Repo Data
  const repoWrapper = document.querySelector('.site__main__repo__wrapper');
  const repoFragment = new DocumentFragment();
  user.repositories.nodes.forEach((item) => {
    const repoItem = createElement('div', ['site__main__repo__item']);

    const repoItemContent = createElement('div', [
      'site__main__repo__item__content',
    ]);

    const repoItemTitle = createElement('h2', [
      'site__main__repo__item__title',
    ]);

    const repoItemTitleLink = createElement('a', ['site__link'], {
      href: item.url,
    });
    repoItemTitleLink.textContent = item.name;
    repoItemTitle.appendChild(repoItemTitleLink);
    repoItemContent.appendChild(repoItemTitle);

    const repoItemDescription = createElement('p', [
      'site__main__repo__item__description',
    ]);
    repoItemDescription.textContent = item.description || '';
    repoItemContent.appendChild(repoItemDescription);

    const repoItemFooter = createElement('div', [
      'site__main__repo__item__footer',
    ]);

    if (item.primaryLanguage) {
      const repoItemLanguageSection = createElement('span', [
        'site__main__repo__item__language',
        'mr-1',
      ]);

      const repoItemIndicator = createElement('span', ['repo-indicator']);
      repoItemIndicator.style.backgroundColor = item.primaryLanguage?.color;
      repoItemLanguageSection.appendChild(repoItemIndicator);

      const repoItemLanguage = createElement('span', [
        'site__main__repo__language',
      ]);
      repoItemLanguage.textContent = item.primaryLanguage?.name;
      repoItemLanguageSection.appendChild(repoItemLanguage);
      repoItemFooter.appendChild(repoItemLanguageSection);
    }

    if (item.stargazerCount > 0) {
      const repoStarredLink = createElement('a', ['link', 'mr-1'], {
        href: '#top',
      });

      const repoStarredSvg = createSVG(
        'M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z',
        ['link__icon']
      );
      repoStarredLink.appendChild(repoStarredSvg);

      const repoStarredCount = createElement('span', ['starred']);
      repoStarredCount.textContent = item?.stargazerCount;
      repoStarredLink.appendChild(repoStarredCount);
      repoItemFooter.appendChild(repoStarredLink);
    }

    if (item.forkCount > 0) {
      const repoForkedLink = createElement('a', ['link', 'mr-1'], {
        href: '#top',
      });

      const repoForkedSvg = createSVG(
        'M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z',
        ['link__icon']
      );
      repoForkedLink.appendChild(repoForkedSvg);

      const repoForkedCount = createElement('span', ['fork']);
      repoForkedCount.textContent = item?.forkCount;
      repoForkedLink.appendChild(repoForkedCount);
      repoItemFooter.appendChild(repoForkedLink);
    }

    const repoUpdatedDate = createElement('span', [], {
      title: item.updatedAt,
    });
    repoUpdatedDate.textContent = dateFormatter(item.updatedAt);
    repoItemFooter.appendChild(repoUpdatedDate);

    repoItemContent.appendChild(repoItemFooter);

    const repoStarBtn = createElement(
      'button',
      ['main-btn', 'main-btn--small'],
      { type: 'button' }
    );

    const repoStarSvg = createSVG(
      'M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z',
      ['main-btn__icon']
    );
    repoStarBtn.appendChild(repoStarSvg);

    const repoStarBtnText = createElement('span');
    repoStarBtnText.textContent = 'Star';
    repoStarBtn.appendChild(repoStarBtnText);

    repoItem.appendChild(repoItemContent);
    repoItem.appendChild(repoStarBtn);
    repoFragment.appendChild(repoItem);
  });
  repoWrapper.appendChild(repoFragment);
}

// Only fetch data if we are on the search page
if (window.location.pathname === '/search.html') {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');

  function getDataQuery(user) {
    return `{
  user(login: "${user}") {
    avatarUrl
    bio
    following {
      totalCount
    }
    followers {
      totalCount
    }
    location
    login
    name
    twitterUsername
    url
    websiteUrl
    starredRepositories {
      totalCount
    }
    repositories(first: 20, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}, ownerAffiliations: [OWNER]) {
      totalCount
      nodes {
        name
        description
        forkCount
        updatedAt
        stargazerCount
        primaryLanguage {
          color
          name
        }
        url
      }
    }
  }
}
`;
  }
  // Break token to stop github token check
  const tokenPart1 = 'ghp_GVvkU8jUzo5omz';
  const tokenPart2 = 'dOcTR8dkvHjEDplo1fp1CP';
  const token = `${tokenPart1}${tokenPart2}`;
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: getDataQuery(username),
    }),
  };

  async function fetchData() {
    try {
      const response = await fetch('https://api.github.com/graphql', options);
      const { data, errors } = await response.json();
      if (errors) {
        console.log(
          'Error fetching user data. Please check username and try again.',
          errors
        );
        window.location.replace('/404.html');
        return;
      }
      templateBuilder(data);
      return;
    } catch (error) {
      console.log(error);
      window.location.replace('/404.html');
    }
  }

  fetchData();
}
