class AcMerryXmasTaskPopupViewTab1 extends AcMerryXmasTaskPopupViewTab {
    protected _tab = 1;

    protected getTabIndex():number{
		  return 1;
    }
    
    public dispose(): void {
        this._tab = 1;
        super.dispose();
    }
}