import { products } from './data/products'
import { ProductCard } from './components/ProductCard'

export default function App() {
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-100 antialiased">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="max-w-2xl">
          <p className="text-sm font-medium tracking-wide text-sky-400">
            thanhchungbtc.github.io
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Products &amp; experiments
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            A home for the small things I build. Each one lives at its own path on
            this domain.
          </p>
        </header>

        <main className="mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </main>

        <footer className="mt-20 border-t border-white/10 pt-8 text-sm text-zinc-500">
          <p>
            Built with React, Vite &amp; Tailwind. ·{' '}
            <a
              href="https://github.com/thanhchungbtc"
              className="text-zinc-400 underline-offset-4 hover:text-white hover:underline"
            >
              GitHub
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
