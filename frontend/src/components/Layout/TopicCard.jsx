import { useState, useEffect } from "react";
import axiosService from "../../services/axiosService";
import { Link } from "react-router-dom";

export default function TopicCard() {
  const [categories, setCategories] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategory();
  }, []);

  async function getCategory() {
    let data = (await axiosService.get("/category")).data;
    setCategories(data);
    setIsLoading(false);
  }

  if (categories && categories.length <= 0) {
    return <h1>Tartışma Bulunmuyor</h1>;
  }

  return (
    <>
      {isLoading
        ? null
        : categories.map((category) => {
            return (
              <div>
                <div className="card lg:card-side bordered shadow-lg w-full ">
                  <figure>
                    <img className="w-48 h-48" src="/public/logo.png" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{category.title}</h2>
                    <p>{category.topic}</p>
                    <div className="card-actions">
                      <Link to={`/chat/${category.title}/${category.id}`}>
                        <button className="btn btn-primary">
                          Tartışmaya Katıl
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
}
