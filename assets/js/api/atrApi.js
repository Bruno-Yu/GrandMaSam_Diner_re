import Api from '@/assets/js/api/api';
// import qs from 'qs';


const apiPrefix = import.meta.env.VITE_API_BASE_URL;
const apiPath = import.meta.env.VITE_API_BASE_URL_PATH;

// Api 自 Api 繼承所有屬性與方法
class atrApi extends Api {

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

    // user 前台取得全部產品 (有分頁)
  static async getProducts( page=1, category='') {
    const queryPage = `?page=${page}`;
    const queryCategory = category? `&&category=${category}`: '';
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/products${queryPage}${queryCategory}`, null, undefined, undefined, false);
    return res;
  }

    // user 前台取得全部產品 (無分頁)
  static async getNoPageProducts() {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/products/all`, null, undefined, undefined, false);
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

  // 編輯 user 購物車
    static async editCart(id ,data) {
      const params = {
      data,
    };
    const res = await this.callAxios('PUT', `${apiPrefix}api/${apiPath}/cart/${id}`, params, undefined, undefined, false);
    return res;
  }

  // user 取得購物車
    static async getCart() {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/cart`, null, undefined, undefined, false);
    return res;
  }

  // user 更新購物車數量
  static async editCart( id, data) {
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

      // user 新增 訂單
  static async generateOrder( { name, email, tel, address, message }) {
    const params = {
    'data':{ 
      'user':{
        name,
        email,
        tel,
        address
      },
      message,
      }
    };
    const res = await this.callAxios('POST', `${apiPrefix}api/${apiPath}/order`, params, undefined, undefined, false);
    return res;
  }


    // user 取得全部訂單
  static async getOrders() {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/orders`, null, undefined, undefined, false);
    return res;
  }

    // user 取得單一訂單
  static async getOrder(id) {
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/order/${id}`, null, undefined, undefined, false);
    return res;
  }

  // 確認付款
  static async confirmToPay(id) {
    const res = await this.callAxios('POST', `${apiPrefix}api/${apiPath}/pay/${id}`, null, undefined, undefined, true);
    
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

    // admin 取得訂單
  static async getAdminOrders({page}) {
    const queryPage = `?page=${page}`;
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/admin/orders${queryPage}`, null, undefined, undefined, true);
    return res;
  }

  // admin 更新單一訂單
  static async editAdminOrder(id, {create_at, is_paid, message, products, user, num }) {
    const params = {
    'data':{ 
      create_at,
      is_paid,
      message,
      products,
      user,
      num
      }
    };
    const res = await this.callAxios('PUT', `${apiPrefix}api/${apiPath}/admin/order/${id}`, params, undefined, undefined, true);
    return res;
  }

    // admin 刪除單一訂單
    static async deleteAdminOrder(id) {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/admin/order/${id}`, null, undefined, undefined, true);
    return res;
  }

      // admin 刪除全部訂單
    static async deleteAllAdminOrders() {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/admin/orders/all`, null, undefined, undefined, true);
    return res;
  }
  
  // admin 取得挑戰
  static async getAdminChallenges({page}) {
    const queryPage = `?page=${page}`;
    const res = await this.callAxios('GET', `${apiPrefix}api/${apiPath}/admin/coupons`, null, undefined, undefined, true);
    return res;
  }

  // admin 新增挑戰
  static async addAdminChallenge({title, is_enabled, percent, due_date, code }) {
    const params = {
    'data':{ 
      title,
      is_enabled,
      percent,
      due_date,
      code
      }
    };
    const res = await this.callAxios('POST', `${apiPrefix}api/${apiPath}/admin/coupon`, params, undefined, undefined, true);
    return res;
  }

  // admin 更新單一挑戰
  static async editAdminChallenge(id, {title, is_enabled, percent, due_date, code }) {
    const params = {
    'data':{ 
      title,
      is_enabled,
      percent,
      due_date,
      code
      }
    };
    const res = await this.callAxios('PUT', `${apiPrefix}api/${apiPath}/admin/coupon/${id}`, params, undefined, undefined, true);
    return res;
  }

    // admin 刪除單一挑戰
    static async deleteAdminChallenge(id) {
    const res = await this.callAxios('DELETE', `${apiPrefix}api/${apiPath}/admin/coupon/${id}`, null, undefined, undefined, true);
    return res;
  }

}

export default atrApi;
