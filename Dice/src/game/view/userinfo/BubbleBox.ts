/*
 *@description: 气泡容器
 *@author: hwc 
 *@date: 2020-04-15 19:36:11
 *@version 0.0.1
 */

class BubbleBox extends BaseDisplayObjectContainer{

    private _tryangle:BaseBitmap;
    private _viewbg:BaseBitmap;
    private container:BaseDisplayObjectContainer;
    
    private _tryangleURL:string = "";
    private _bgURL:string = "";
    private _bgwidth:number;
    private _bgheight:number;
    private _tryanglex:number;

    
    public set TryangleURL(value:string){
        if(!value || value == "" || value == this._tryangleURL)
            return;
        this._tryangleURL = value;
        if(!this._tryangle){
            let t = BaseBitmap.create(this._tryangleURL);
            this.addChild(t);
            t.x = this._tryanglex || 0
            t.y = 0;
            this._tryangle = t;
        } else {
            this._tryangle.texture = ResMgr.getRes(this._tryangleURL);
        }
    }

    public get TryangleURL(){
        return this._tryangleURL;
    }
    
    public get TryangleX(){
        return this._tryanglex;
    }

    public set TryangleX(value:number){
        if(value < 10 + this._tryangle.width / 2){
            this._tryanglex = 10 + this._tryangle.width / 2;
        } else if (value > this._bgwidth - this._tryangle.width / 2 -10){
            this._tryanglex = this._bgwidth - this._tryangle.width / 2 -10
        } else {
            this._tryanglex = value;
        }
        this._tryangle.x = this._tryanglex - this._tryangle.width / 2;
    }

    public get Bgurl(){
        return this._bgURL;
    }

    public set Bgurl(value:string){
        if(!value || value == "" || value == this._bgURL)
            return;
        this._bgURL = value;
        if(!this._viewbg){
            let view = BaseBitmap.create(this._bgURL);
            this.addChild(view);
            view.x = 0;
            view.y = this._tryangle.height;
            this._viewbg = view;
        } else {
            this._viewbg.texture = ResMgr.getRes(this._bgURL);
        }
    }

    public get BgWidth(){
        return this._bgwidth;
    }
    public set BgWidth(value:number){
        if(!value || value < 0 ||this._bgwidth == value || !this._viewbg)
            return;
        this._bgwidth = value;
        this._viewbg.width = this._bgwidth;
    }

    public get BgHeight(){
        return this._bgheight;
    }

    public set BgHeight(value:number){
        if(!value || value < 0 ||this._bgheight == value || !this._viewbg)
            return;
        this._bgheight = value;
        this._viewbg.height = this._bgheight;
    }

    constructor(){
        super();
    }
    
    public initView(tryangleURL:string, bgURL:string, bgwidth:number, bgheight:number, tryanglex?:number, dy?:number){

        tryangleURL = tryangleURL || "";
        bgURL = bgURL || "";
        bgwidth = bgwidth || 0;
        bgheight = bgheight || 0;
        this._bgwidth = bgwidth;
        this._bgheight = bgheight;
        this._tryangleURL = tryangleURL;
        this._bgURL = bgURL;

        let triangle = BaseBitmap.create(tryangleURL);

        this._tryanglex = tryanglex ||  bgwidth / 2 - triangle.width / 2;
        this.addChild(triangle);
        triangle.x = tryanglex ||  bgwidth / 2 - triangle.width / 2;
        triangle.y = 0;
        this._tryangle = triangle;
        this.TryangleX = triangle.x + triangle.width / 2;

        let bubble = BaseBitmap.create(bgURL);
        this.addChild(bubble);
        bubble.x = 0;
        bubble.y = triangle.y + triangle.height - 1 - dy;
        bubble.height = bgheight;
        bubble.width = bgwidth;
        this._viewbg = bubble;

        let con = new BaseDisplayObjectContainer();
        con.x = bubble.x;
        con.y = bubble.y;
        this.container = con;
        this.addChild(this.container)
    }

    public addChildCon(obj:egret.DisplayObject){
        if(obj)
		{
			this.container.addChild(obj);
		}
    }

    public dispose(){
        super.dispose();
    }

}