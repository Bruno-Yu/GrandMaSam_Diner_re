// 取文章對應圖片

class articleImageEnum {
  constructor({
    id,
    image,
    name,
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
  }
}


articleImageEnum.GOD = new articleImageEnum({
    id: '-N-tl8D5WkaIJ1frNRRB',
    image: 'https://i.imgur.com/JJIHxqo.jpg',
    name: '那個神的男人',
});

articleImageEnum.BRUSH = new articleImageEnum({
  id: '-N-qk3J_UqL6i1RH6BRz',
  image: 'https://i.imgur.com/pHhKGN5.jpg',
  name: '全球首創 - 可食性牙刷',
});

articleImageEnum.EGG = new articleImageEnum({
    id: '-N-qjhkvfCqcb-6Mx1G-',
    image: 'https://i.imgur.com/Z708ufn.jpg',
    name: '雞蛋是留給有心的人'
});

articleImageEnum.QINGMING = new articleImageEnum({
    id: '-N-qjTKf-jAcAT4ND249',
    image: 'https://i.imgur.com/cCwvJha.jpg',
    name: '只要有心 天天都可以是清明節'
});

articleImageEnum.WALLET = new articleImageEnum({
    id: '-N-qjOg2fvc8GOSgmkrN',
    image: 'https://i.imgur.com/nVyT0mA.jpg',
    name: '錢包的厚度能決定你成就高度?'
});

articleImageEnum.MONEY = new articleImageEnum({
    id: '-N-qjALHXwnpNgIrpokr',
    image: 'https://i.imgur.com/ydGbX1J.jpg', 
    name: '用錢才能解決的問題，那才是真的問題'
});



const articleImageEnumList = [
  articleImageEnum.GOD,
  articleImageEnum.BRUSH,
  articleImageEnum.EGG,
  articleImageEnum.QINGMING,
  articleImageEnum.WALLET,
  articleImageEnum.MONEY,
];

// 單一值
const getArticleImage = (id) => {
  const article = articleImageEnumList.find((e) => e.id === id);
  return article?.image;
  }


export {
  getArticleImage,
};

export default articleImageEnum;
