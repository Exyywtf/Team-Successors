const seenRegistry = new Map<string, true>();
let activeRoute: string | null = null;

export function syncSeenRoute(route: string) {
  if (activeRoute === null) {
    activeRoute = route;
    return;
  }

  if (activeRoute !== route) {
    seenRegistry.clear();
    activeRoute = route;
  }
}

export function getSeenKey(route: string, id: string) {
  return `${route}::${id}`;
}

export function hasSeen(key: string) {
  return seenRegistry.has(key);
}

export function markSeen(key: string) {
  seenRegistry.set(key, true);
}
