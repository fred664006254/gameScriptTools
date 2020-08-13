class StoryShowEffect extends BaseDisplayObjectContainer
{


    public constructor() 
	{
		super();
	}

    public init(f:Function,f2:Function,o:any):void
	{
        let alpha:BaseBitmap = BaseBitmap.create("public_alphabg");
        alpha.width = GameConfig.stageWidth;
        alpha.height = GameConfig.stageHeigth;
        this.addChild(alpha);

        this.touchEnabled = true;

        let book:BaseBitmap = BaseBitmap.create("officialcareer_storyrecall");
        book.setScale(1.1);
        let book_x:number = 274-book.width*0.05;
        let book_y:number = GameConfig.stageHeigth-301-book.height*0.05;
        book.setPosition(book_x,book_y);
        this.addChild(book);

        let book2:BaseBitmap = BaseBitmap.create("officialcareer_storyrecall");
        book2.setScale(2.2);
        let book2_x:number = 274-book2.width*0.6;
        let book2_y:number = GameConfig.stageHeigth-301+book2.height*0.6 - 30;
        book2.setPosition(book2_x,book2_y);
        this.addChild(book2);
        book2.alpha = 0.1;

        let light:BaseBitmap = BaseBitmap.create("officialcareer_orange_bg");
        light.width = GameConfig.stageWidth;
        light.height = GameConfig.stageHeigth;
        this.addChild(light);
        light.alpha = 0;

        let book_x1:number = book_x - book.width*0.55;
        let book_y1:number = book_y - book.height*0.55 - 100;
        let book_x2:number = book_x - book.width*1.65;
        let book_y2:number = book_y - book.height*1.65 - 150;
        let book_x3:number = book_x - book.width*2.4;
        let book_y3:number = book_y - book.height*2.4 - 150;

        egret.Tween.get(book).to({scaleX:2.2,scaleY:2.2,x:book_x1,y:book_y1},130).to({scaleX:4.4,scaleY:4.4,x:book_x2,y:book_y2},200).to({scaleX:5.9,scaleY:5.9,x:book_x3,y:book_y3},70).call(function(){
            book.dispose();
        });

        let book2_x1:number = book2_x - book2.width*1.1;
        let book2_y1:number = book2_y - book2.height*1.1 - 200;;
        let book2_x2:number = book2_x - book2.width*1.85;
        let book2_y2:number = book2_y - book2.height*1.85- 280;
        let book2_x3:number = book2_x - book2.width*4.8;
        let book2_y3:number = book2_y - book2.height*4.8- 350;

        egret.Tween.get(book2).to({scaleX:4.4,scaleY:4.4,x:book2_x1,y:book2_y1,alpha:0.4},130).to({scaleX:5.9,scaleY:5.9,x:book2_x2,y:book2_y2,alpha:0.4},200)
        .to({scaleX:12,scaleY:12,x:book2_x3,y:book2_y3,alpha:0.4},130);

        let that = this;
        egret.Tween.get(light).to({alpha:0},270).to({alpha:1},200).call(f,o).to({alpha:0},200).call(f2,o).call(function(){
            that.dispose();
        });


    }
}