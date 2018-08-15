import { asyncRouterMap, constantRouterMap } from '@/router'

/*
* deepcopy*/
function deepCopy(source) {
  if (!source) {
    return source
  }
  const sourceCopy = source instanceof Array ? [] : {}
  for (const item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
  }
  return sourceCopy
}
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: deepCopy(constantRouterMap),
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      const newRouters = deepCopy(constantRouterMap.concat(routers))
      state.addRouters = routers
      state.routers = newRouters
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        // const { roles } = data
        // let accessedRouters
        // if (roles.indexOf('admin') > -1) {
        //   accessedRouters = asyncRouterMap
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        // }
        // const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', deepCopy(asyncRouterMap))
        resolve()
      })
    }
  }
}
export default permission