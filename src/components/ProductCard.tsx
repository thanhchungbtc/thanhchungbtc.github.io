import type { Product, ProductStatus } from '../data/products'

const statusStyles: Record<ProductStatus, { label: string; className: string }> = {
  live: { label: 'Live', className: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30' },
  wip: { label: 'In progress', className: 'bg-amber-500/15 text-amber-300 ring-amber-500/30' },
  archived: { label: 'Archived', className: 'bg-zinc-500/15 text-zinc-400 ring-zinc-500/30' },
}

export function ProductCard({ product }: { product: Product }) {
  const status = statusStyles[product.status]
  const href = `/${product.slug}/`
  const isClickable = product.status === 'live'

  const inner = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-3xl" aria-hidden>
          {product.icon ?? '📦'}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${status.className}`}
        >
          {status.label}
        </span>
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{product.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{product.description}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/5 px-2 py-0.5 text-xs font-medium text-zinc-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </>
  )

  const base =
    'group block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition'

  if (!isClickable) {
    return <div className={`${base} opacity-80`}>{inner}</div>
  }

  return (
    <a href={href} className={`${base} hover:border-white/25 hover:bg-white/[0.06]`}>
      {inner}
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sky-400 group-hover:gap-2 transition-all">
        Open
        <span aria-hidden>→</span>
      </span>
    </a>
  )
}
