export default function({ store, route }) {
  // on reroute set page
  if (!route.path.includes('login') && !route.path.includes('register'))
    store.commit('setLastPage', route.path)
}
