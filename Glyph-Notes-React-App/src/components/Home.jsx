

export default function Home() {
  return (
    <div className="homePage">
      <div className="cursor">
        {/* Displaying a welcoming heading */}
        <h1 className="Homeheading">Welcome To Glyph Notes</h1>
      </div>
      {/* Providing instructions for creating or opening notes */}
      <p className="desc">
        Click On The New Notes To Create A New Note! <br /> Or <br />
        Open One Of The Previously Saved Notes By Clicking On The Side Panel
      </p>
    </div>
  );
}

