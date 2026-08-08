function DashboardCard({ title, value }) {

return (

```
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow duration-200">

  <p className="text-sm font-medium text-gray-500">
    {title}
  </p>

  <h2 className="text-3xl font-bold text-gray-900 mt-3">
    {value}
  </h2>

  <div className="mt-4 h-1 w-10 bg-blue-600 rounded-full" />

</div>
```

);

}

export default DashboardCard;
