import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex justify-end gap-4 bg-gray-100 px-4 py-2 text-sm">
        <Link href="/help">Help</Link>
        <Link href="/orders">Orders & Returns</Link>
        <span>Hi, John</span>
      </div>
      <nav className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold">ECOMMERCE</Link>
        <div className="flex gap-8">
          <Link href="/categories">Categories</Link>
          <Link href="/sale">Sale</Link>
          <Link href="/clearance">Clearance</Link>
          <Link href="/new-stock">New stock</Link>
          <Link href="/trending">Trending</Link>
        </div>
        <div className="flex gap-4">
          <Search className="h-6 w-6" />
          <ShoppingCart className="h-6 w-6" />
        </div>
      </nav>
      <div className="flex items-center justify-center bg-gray-100 py-2">
        <button className="flex items-center gap-2">
          <span>‹</span>
          <span>Get 10% off on business sign up</span>
          <span>›</span>
        </button>
      </div>
    </header>
  )
}

export default Header