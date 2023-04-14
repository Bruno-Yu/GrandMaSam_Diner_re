import Api from '@/assets/js/api/api';
// import qs from 'qs';

// const apiPrefix = import.meta.env.VITE_APP_API;
// const apiPrefix = process.env.API_BASE_URL;
// const apiPath = import.meta.env.VITE_APP_PATH;
// const apiPath = process.env.API_BASE_URL_PATH;
// const apiPrefix = import.meta.env.VITE_LOCAL_API;
const apiPrefix = 'https://vue3-course-api.hexschool.io/v2/';
const apiPath = 'brunoyu2022';

// Api 自 Api 繼承所有屬性與方法
class atrApi extends Api {
  // static apiPrefix = process.env.API_BASE_URL;
  // static apiPath = process.env.API_BASE_URL_PATH;
  // http://localhost:3000/;
  // https://vue3-course-api.hexschool.io/v2/;
  // brunoyu2023

  // user 登入
  static async login({ username, password }) {
    const params = {
      username, password,
    };
    const res = await this.callAxios('POST', `${apiPrefix}admin/signin`, params, undefined, undefined, false);
    return res;
  }

  // user 登出
    static async logOut() {
    const res = await this.callAxios('POST', `${apiPrefix}logout`, null, undefined, undefined, true);
    return res;
  }

  // user 確認是否是登入狀態
    static async checkLoginStatus() {
    const res = await this.callAxios('POST', `${apiPrefix}api/user/check`, null, undefined, undefined, true);
    return res;
  }

    // user 前台取得全部產品
  static async getProducts( page=1, category='') {
    const queryPage = `?page=${page}`;
    const queryCategory = category? `?category=${category}`: '';
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/products${queryPage}${queryCategory}`, null, undefined, undefined, false);
    return res;
  }

  // user 前台取得單一產品
  static async getProduct(id) {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/product/${id}`, null, undefined, undefined, false);
    return res;
  }

  // user 新增購物車
  static async addToCart({data}) {
      const params = {
      data,
    };
    const res = await this.callAxios('POST', `${apiPrefix}api/${apiPath}/cart`, params, undefined, undefined, false);
    return res;
  }


  // user 取得購物車
    static async getCart() {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/cart`, null, undefined, undefined, false);
    return res;
  }

  // user 更新購物車數量
  static async editCart({ data }, id) {
    const params = {
      data,
    }
    const res = await this.callAxios('PUT', `${apiPrefix}api/${apiPath}/cart/${id}`, params, undefined, undefined, false);
    return res;
  }

    // user 刪除購物車單一產品
  static async deleteCartProduct(id) {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/cart/${id}`, null, undefined, undefined, false);
    return res;
  }

      // user 刪除購物車全部產品
  static async deleteCartAll() {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/carts`, null, undefined, undefined, false);
    return res;
  }

  //  user 取得文章列表
    static async getArticles() {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/articles`, null, undefined, undefined, false);
    return res;
  }

  // user 取得單一文章
  static async getArticle(id) {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/article/${id}`, null, undefined, undefined, false);
    return res;
  }


  // admin 取得全部產品
  static async getAdminProducts({page, category}) {
        const queryPage = `?page=${page}`;
    const queryCategory = category? `?category=${category}`: '';
    // console.log('getAdminProducts params', params)
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/admin/products${queryPage}${queryCategory}`, null, undefined, undefined, true);
    return res;
  }

  // admin 更新產品
  static async editAdminProduct(id, {title, category, origin_price, rating, num, price, unit, description, content, is_enabled,imageUrl, imagesUrl }) {
    const params = {
    'data':{ 
      title,
      category,
      origin_price,
      rating,
      price,
      unit,
      num,
      description,
      content,
      is_enabled,
      imageUrl,
      imagesUrl,
      }
    };
    const res = await this.callAxios('PUT', `${apiPrefix}api/${apiPath}/admin/product/${id}`, params, undefined, undefined, true);
    return res;
  }
    // admin 新增 產品
  static async addAdminProduct( {title, category, rating, origin_price, price, num, unit, description, content, is_enabled,imageUrl, imagesUrl }) {
    const params = {
    'data':{ 
      title,
      category,
      origin_price,
      price,
      unit,
      num,
      rating,
      description,
      content,
      is_enabled,
      imageUrl,
      imagesUrl,
      }
    };
    const res = await this.callAxios('POST', `${apiPrefix}api/${apiPath}/admin/product/`, params, undefined, undefined, true);
    return res;
  }

  // admin 刪除單一商品
    static async deleteAdminProduct(id) {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/admin/product/${id}`, null, undefined, undefined, true);
    return res;
  }

    // admin 取得單一文章
  static async getAdminArticle(id) {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/admin/article/${id}`, null, undefined, undefined, true);
    return res;
  }

    // admin 取得全部文章
  static async getAdminArticles({page}) {
    const queryPage = `?page=${page}`;
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/admin/articles${queryPage}`, null, undefined, undefined, true);
    return res;
  }
     // admin 新增單一文章
  static async addAdminArticle({title, description, image, tag, create_at, author, isPublic, content,  imageUrl }) {
    const params = {
    'data':{ 
      title,
      image,
      tag,
      create_at,
      author,
      description,
      content,
      isPublic,
      imageUrl,
      }
    };
    const res = await this.callAxios('POST', `${apiPrefix}api/${apiPath}/admin/article`, params, undefined, undefined, true);
    return res;
  }

    // admin 更新單一文章
  static async editAdminArticle(id, {title, description, image, tag, create_at, author, isPublic, content,  imageUrl }) {
    const params = {
    'data':{ 
      title,
      image,
      tag,
      create_at,
      author,
      description,
      content,
      isPublic,
      imageUrl,
      }
    };
    const res = await this.callAxios('PUT', `${apiPrefix}api/${apiPath}/admin/article/${id}`, params, undefined, undefined, true);
    return res;
  }

    // admin 刪除單一文章
    static async deleteAdminArticle(id) {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/admin/article/${id}`, null, undefined, undefined, true);
    return res;
  }
}

export default atrApi;
