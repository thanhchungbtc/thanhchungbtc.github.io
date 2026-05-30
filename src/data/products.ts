export type ProductStatus = 'live' | 'wip' | 'archived'

export interface Product {
  /** URL slug — the app is hosted at /{slug}/ */
  slug: string
  /** Display name */
  name: string
  /** One-line description shown on the card */
  description: string
  /** Tech tags, e.g. ['React', 'Vite'] */
  tags: string[]
  /** Lifecycle status, controls the badge */
  status: ProductStatus
  /** Optional emoji or short string used as the card icon */
  icon?: string
}

/**
 * The single source of truth for every product hosted on this domain.
 * To publish a new product:
 *   1. Build it with Vite `base: '/{slug}/'`.
 *   2. Drop its build output into the published site at /{slug}/.
 *   3. Add an entry here so it shows up on the landing page.
 */
export const products: Product[] = [
  {
    slug: 'hub',
    name: 'Product Hub',
    description:
      'This landing page — a directory of everything hosted under thanhchungbtc.github.io.',
    tags: ['React', 'Vite', 'Tailwind'],
    status: 'wip',
    icon: '🧭',
  },
]
