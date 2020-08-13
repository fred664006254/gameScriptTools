class AcMerryXmasTaskPopupViewTab2 extends AcMerryXmasTaskPopupViewTab {
    protected _tab = 2;

    protected getTabIndex():number{
		return 2;
    }
    
    public dispose(): void {
        this._tab = 2;
        super.dispose();
    }
}