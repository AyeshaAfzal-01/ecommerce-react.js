- npm install axios react-router-dom react-toastify
- server property in vite.config.js file: You set server.port so each project runs on its own fixed port, avoiding conflicts and making development predictable.
- value property in input fields. like for category selection value = {category} is important because it make react a single source of truth
const [category, setCategory] = useState("Men");

<select 
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Men">Men</option>
  <option value="Women">Women</option>
  <option value="Kids">Kids</option>
</select>

<button onClick={() => setCategory("Kids")}>Set to Kids</button>
- When you change the dropdown, setCategory(...) still works ✅ (so your state updates).

- BUT if you click the button (setCategory("Kids")), the dropdown will not change visually — it will still show whatever the browser last had selected (maybe "Men").
❌ React is not controlling the UI.
- but if you set value={category} problem will solve 