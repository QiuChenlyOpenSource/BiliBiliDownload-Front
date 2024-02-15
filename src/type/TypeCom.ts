export type UserInfo = {
  isLogin: boolean;
  email_verified: number;
  face: string;
  face_nft: number;
  face_nft_type: number;
  level_info: {
    current_level: number;
    current_min: number;
    current_exp: number;
    next_exp: number;
  };
  mid: number;
  mobile_verified: number;
  money: number;
  moral: number;
  official: {
    role: number;
    title: string;
    desc: string;
    type: number;
  };
  officialVerify: {
    type: number;
    desc: string;
  };
  pendant: {
    pid: number;
    name: string;
    image: string;
    expire: number;
    image_enhance: string;
    image_enhance_frame: string;
    n_pid: number;
  };
  scores: number;
  uname: string;
  vipDueDate: number;
  vipStatus: number;
  vipType: number;
  vip_pay_type: number;
  vip_theme_type: number;
  vip_label: {
    path: string;
    text: string;
    label_theme: string;
    text_color: string;
    bg_style: number;
    bg_color: string;
    border_color: string;
    use_img_label: boolean;
    img_label_uri_hans: string;
    img_label_uri_hant: string;
    img_label_uri_hans_static: string;
    img_label_uri_hant_static: string;
  };
  vip_avatar_subscript: number;
  vip_nickname_color: string;
  vip: {
    type: number;
    status: number;
    due_date: number;
    vip_pay_type: number;
    theme_type: number;
    label: {
      path: string;
      text: string;
      label_theme: string;
      text_color: string;
      bg_style: number;
      bg_color: string;
      border_color: string;
      use_img_label: boolean;
      img_label_uri_hans: string;
      img_label_uri_hant: string;
      img_label_uri_hans_static: string;
      img_label_uri_hant_static: string;
    };
    avatar_subscript: number;
    nickname_color: string;
    role: number;
    avatar_subscript_url: string;
    tv_vip_status: number;
    tv_vip_pay_type: number;
    tv_due_date: number;
    avatar_icon: {
      icon_resource: {};
    };
  };
  wallet: {
    mid: number;
    bcoin_balance: number;
    coupon_balance: number;
    coupon_due_time: number;
  };
  has_shop: boolean;
  shop_url: string;
  allowance_count: number;
  answer_status: number;
  is_senior_member: number;
  wbi_img: {
    img_url: string;
    sub_url: string;
  };
  is_jury: boolean;
};

export type UserFavoriteList = {
  count: number;
  list: Array<{
    id: number;
    fid: number;
    mid: number;
    attr: number;
    title: string;
    fav_state: number;
    media_count: number;
  }>;
  season: any;
};

export type UserFavoriteMedia = {
  info: {
    id: number;
    fid: number;
    mid: number;
    attr: number;
    title: string;
    cover: string;
    upper: {
      mid: number;
      name: string;
      face: string;
      followed: boolean;
      vip_type: number;
      vip_statue: number;
    };
    cover_type: number;
    cnt_info: {
      collect: number;
      play: number;
      thumb_up: number;
      share: number;
    };
    type: number;
    intro: string;
    ctime: number;
    mtime: number;
    state: number;
    fav_state: number;
    like_state: number;
    media_count: number;
  };
  medias: Array<{
    id: number;
    type: number;
    title: string;
    cover: string;
    intro: string;
    page: number;
    duration: number;
    upper: {
      mid: number;
      name: string;
      face: string;
    };
    attr: number;
    cnt_info: {
      collect: number;
      play: number;
      danmaku: number;
      vt: number;
      play_switch: number;
      reply: number;
      view_text_1: string;
    };
    link: string;
    ctime: number;
    pubtime: number;
    fav_time: number;
    bv_id: string;
    bvid: string;
    season: any;
    ogv: any;
    ugc: {
      first_cid: number;
    };
  }>;
  has_more: boolean;
  ttl: number;
};

export type UserFavoriteCollect = {
  count: number;
  list: Array<{
    id: number;
    fid: number;
    mid: number;
    attr: number;
    title: string;
    cover: string;
    upper: {
      mid: number;
      name: string;
      face: string;
    };
    cover_type: number;
    intro: string;
    ctime: number;
    mtime: number;
    state: number;
    fav_state: number;
    media_count: number;
    view_count: number;
    vt: number;
    play_switch: number;
    type: number;
    link: string;
    bvid: string;
  }>;
  has_more: boolean;
};
