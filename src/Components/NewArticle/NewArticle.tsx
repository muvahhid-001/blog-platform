import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { createArticle } from "../Api/Api";
import "./NewArticle.scss";
import { useNavigate } from "react-router-dom";

const NewArticle = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState([{ value: "" }]);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    text: false,
    tags: [] as boolean[],
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const titleError = !title.trim();
    const descError = !description.trim();
    const textError = !text.trim();
    const tagErrors = tags.map(
      (tag) => !tag.value.trim() || tag.value.trim().length > 12
    );

    setErrors({
      title: titleError,
      description: descError,
      text: textError,
      tags: tagErrors,
    });

    const hasErrors =
      titleError || descError || textError || tagErrors.includes(true);
    if (hasErrors) return;

    const articleData = {
      title,
      description,
      body: text,
      tagList: tags.map((tag) => tag.value.trim()),
    };

    await createArticle(articleData, navigate);
  };

  const handleTagChange = (index: number, newValue: string) => {
    if (newValue.length > 12) return;
    setTags((prev) =>
      prev.map((tag, idx) => (idx === index ? { value: newValue } : tag))
    );
    setErrors((prev) => {
      const updatedTags = [...prev.tags];
      updatedTags[index] = false;
      return { ...prev, tags: updatedTags };
    });
  };

  const handleAddTag = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTags((prev) => [...prev, { value: "" }]);
    setErrors((prev) => ({ ...prev, tags: [...prev.tags, false] }));
  };

  const handleDeleteTag = (index: number) => {
    if (tags.length === 1) return;
    setTags((prev) => prev.filter((_, idx) => idx !== index));
    setErrors((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <main className="new-article-block">
      <div className="new-article">
        <form onSubmit={handleSubmit}>
          <h2 className="new-article__title">Create new article</h2>
          <label className="new-article__article__title">
            Title
            <input
              type="text"
              placeholder="Title"
              className={`new-article__title-input ${errors.title ? "input-error" : ""}`}
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors((prev) => ({ ...prev, title: false }));
              }}
            />
          </label>
          <label className="new-article__short-description">
            Short description
            <input
              type="text"
              placeholder="Short description"
              className={`new-article__description-input ${errors.description ? "input-error" : ""}`}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((prev) => ({ ...prev, description: false }));
              }}
            />
          </label>
          <label className="new-article__text">
            Text
            <TextareaAutosize
              placeholder="Text"
              className={`new-article__text-input ${errors.text ? "input-error" : ""}`}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setErrors((prev) => ({ ...prev, text: false }));
              }}
            />
          </label>
          <div className="new-article__tags">
            <label className="new-article__tags-title">Tags</label>
            {tags.map((tag, index) => (
              <div className="new-article__tag-row" key={index}>
                <input
                  className={`new-article__tag-input ${errors.tags[index] ? "input-error" : ""}`}
                  placeholder="Tag"
                  type="text"
                  value={tag.value}
                  onChange={(e) => handleTagChange(index, e.target.value)}
                />
                {tags.length > 1 && (
                  <button
                    className="new-article__delete"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDeleteTag(index);
                    }}
                  >
                    Delete
                  </button>
                )}
                {index === tags.length - 1 && (
                  <button
                    className="new-article__add-tag"
                    onClick={handleAddTag}
                  >
                    Add tag
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="send">
            Send
          </button>
        </form>
      </div>
    </main>
  );
};

export default NewArticle;
