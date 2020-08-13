/**
 * 英文--周年庆
 * date 2019/6/3
 * @author 张朝阳
 * @class AcGroupZhounianqingView
 */
class AcGroupZhounianqingView extends AcGroupBaseView {

    protected getBuildingCfg() {
        return [
            { aid: "arcade", buildId: "arcade", buildPos: { x: 239, y: 698 + 40 }, buildScale: 4, brandPos: { x: 371, y: 715 + 40 } },
            { aid: "courier", buildId: "courier", buildPos: { x: -3, y: 568 + 40 }, buildScale: 4, brandPos: { x: 68, y: 583 + 40 } },
            { aid: "hotel", buildId: "hotel", buildPos: { x: 151, y: 475 + 40 }, buildScale: 4, brandPos: { x: 185, y: 441 + 40 } },
            { aid: "yunDingLongKu", buildId: "yundinglongku", buildPos: { x: 275, y: 282 + 40 }, buildScale: 4, brandPos: { x: 320, y: 252 + 40 } },
        ];
    }
    protected getBubbleTipCfg() {
        return {
            "yunDingLongKu-1": { x: 255, y: 303 + 40 },
            "yunDingLongKu-2": { x: 255, y: 303 + 40 },
            "arcade-1": { x: 295, y: 760 + 40 },
            "arcade-2": { x: 295, y: 760 + 40 },
            "courier-3": { x: 12, y: 630 + 40 },
            "hotel-2": { x: 125, y: 488 + 40 },
            "hotel-3": { x: 125, y: 488 + 40 },
        };
    }
    public constructor() {
        super();
    }

     protected getContainerY():number
	{
		return 0;
	}

    protected initView() {
        super.initView()

    }
    protected initScenceEffect() {
        let wheel = ComponentManager.getCustomMovieClip("accourierview_wheel", 12, 150);
        wheel.setPosition(this._bg.x - 3, this._bg.y + 602);
        this.addChildToContainer(wheel);
        wheel.playWithTime(-1);

        let long = ComponentManager.getCustomMovieClip("acyundinglongkuview_long", 10, 150);
        long.setPosition(this._bg.x + 259, this._bg.y + 336);
        this.addChildToContainer(long);
        long.playWithTime(-1);

        let game1 = ComponentManager.getCustomMovieClip("acarcadeview_game", 15, 100);
        game1.setPosition(this._bg.x + 323 + 40 + 3, this._bg.y + 911 + 57 - 60 + 2); //631  688
        // game1.setScale(-1);  323 688 。373 628
        game1.scaleY = 1;
        game1.scaleX = -1;
        this.addChildToContainer(game1);
        game1.playWithTime(-1);

        let game2 = ComponentManager.getCustomMovieClip("acarcadeview_game", 15, 100);
        game2.setPosition(this._bg.x + 548, this._bg.y + 951);
        this.addChildToContainer(game2);
        game2.playWithTime(-1);


        let barlight = ComponentManager.getCustomMovieClip("achotelview_barlight", 15, 100);
        barlight.setPosition(this._bg.x + 194, this._bg.y + 533);
        this.addChildToContainer(barlight);
        barlight.playWithTime(-1);
        barlight.blendMode = egret.BlendMode.ADD;
    }
    public dispose(): void {
        super.dispose();
    }
}