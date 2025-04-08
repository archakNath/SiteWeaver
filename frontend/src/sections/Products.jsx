import { SquareAsterisk } from "lucide-react";
import React from "react";
import Button from "../components/Button";
import { Link, Outlet, useParams } from "react-router-dom";

const Products = () => {
  const params = useParams(); // Get route parameters

  return (
    <div className="flex-1 px-10 py-4 font-outfit">
      {/* Check if the route is 'new', and replace the onboarding section */}
      {params["*"] === "new" ? (
        <Outlet /> // Render NewProduct component for 'new' route
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-10">Products</h1>
          <div className="border-2 border-slate-200 p-6 h-[60vh] bg-white shadow-lg rounded-xl flex justify-center items-center flex-col gap-4">
            <SquareAsterisk className="w-24 h-24" />
            <h2 className="text-xl">First up: what are you selling?</h2>
            <p className="text-center text-sm max-w-sm text-slate-400">
              Before you open your store, first you need some products.
            </p>
            <Link to="new">
              <Button mode="dark" name="Add your products" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
