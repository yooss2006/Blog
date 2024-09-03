import ToggleSideBarButton from "./toggle-side-bar-button";

export default function Header() {
  return (
    <header className="w-full h-14 px-4 flex items-center justify-between leading-[3.5rem] text-center border-b-2 border-normalColor">
      <div>
        <div className="flex lg:hidden align-middle">
          <ToggleSideBarButton size="small" />
        </div>
      </div>
      <h1 className="text-xl text-pointColor">긱 갱스터 블로그</h1>
      <div></div>
    </header>
  );
}
