1. Why Collection.jsx shows products at first (without dependency array)

Since Collection.jsx is a page, it’s mounted when you navigate there.

At first navigation, your products state is already filled in the context (because you probably fetched them on App.jsx or a parent component once).

So even if your effect in Collection.jsx doesn’t depend on products, it still renders them (because context/state already has the products).

But… when you refresh the page:

Everything resets.

On reload, your products is empty at mount time.

Since your effect didn’t depend on products, it never re-ran after products got fetched, so you end up with an empty list forever.

2. Why BestSeller.jsx never shows products at all (without dependency array)

BestSeller.jsx is just a component on some page (probably Home.jsx).

When the Home page first mounts, products are still empty in the context.

Since you didn’t put products in dependency array, your filter logic runs only once (with empty products).

Even after products arrive, BestSeller doesn’t update → so nothing ever shows.

✅ Difference in behavior:

Collection.jsx happened to work once (before refresh) because the context already had data loaded when you navigated there.

BestSeller.jsx never worked because at its mount time, the context was still empty.