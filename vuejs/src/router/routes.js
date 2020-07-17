// Because too many lazy loading pages will cause webpack hot update too slow, so the development environment does not use lazy loading, only the production environment uses lazy loading
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

const meta = {
  // keepAlive: true
  disableCache: false
}

const frameIn = [{
    path: "/:id(\\d)::cmd(text)/:path",
    name: 'text',
    component: _import("page/GoText"),
    meta: {
      ...meta,
      view: 'text',
    }
  },
  {
    path: "/:id(\\d)::cmd(pdf)/:path",
    name: 'pdf',
    component: _import("page/GoPdf"),
    meta: {
      ...meta,
      view: 'pdf',
    }
  },
  {
    path: "/",
    name: 'base',
    component: _import("page/GoList"),
    meta: {
      ...meta,
      redirect: true,
    }
  },
  {
    path: "/:id(\\d)::cmd(video)/:path",
    name: 'video',
    component: _import("page/GoVideo"),
    meta: {
      ...meta,
      view: 'video',
    }
  },
  {
    path: "/:id(\\d)::cmd(audio)/:path",
    name: 'audio',
    component: _import("page/GoAudio"),
    meta: {
      ...meta,
      view: 'audio',
    }
  },
  {
    path: "/:id(\\d)::cmd(image)/:path",
    name: 'image',
    component: _import("page/GoImg"),
    meta: {
      ...meta,
      view: 'image',
    }
  },
  {
    path: "/:id(\\d)::cmd(search)(/?q=)*",
    name: 'search',
    component: _import("page/GoList"),
    meta: {
      ...meta,
      view: 'list',
    }
  },
  {
    path: "/:id(\\d):/:path*",
    name: 'files',
    component: _import("page/GoList"),
    meta: {
      ...meta,
      view: 'list',
    }
  },
  {
      path: '/:id(\\d)::cmd(home)/',
      name: 'home',
      component: _import("page/static/Home"),
      meta: {
          ...meta,
      }
  },
];

export default frameIn;
