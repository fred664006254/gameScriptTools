/**
  * 红颜剪影
  * @author 张朝阳
  * date 2019/7/10
  * @class WifeLoveCucolorisView
  */
class WifeLoveCucolorisView extends BaseView {

	public constructor() {
		super();
	}



	protected initView(): void {

		this.alpha = 0;
		egret.Tween.get(this).to({ alpha: 1 }, 200).wait(2200).call(() => {
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFELOVEANI_CLICK);
		}, this).to({ alpha: 0 }, 400).call(() => {
			egret.Tween.removeTweens(this);
		}, this);

		let bg = BaseLoadBitmap.create("wifelovecucolorisview_bg");
		this.addChildToContainer(bg);

		let light = BaseLoadBitmap.create("wifelovecucolorisview_light");
		light.width = 640;
		light.height = 785;
		this.addChildToContainer(light);
		light.alpha = 0;
		egret.Tween.get(light).wait(200).to({ alpha: 1 }, 1600);

		let man = BaseLoadBitmap.create("wifelovecucolorisview_man")
		man.width = 273;
		man.height = 772;
		man.setPosition(88, 273);
		this.addChildToContainer(man);
		egret.Tween.get(man).wait(200).to({ x: 114, y: 283 }, 1600).to({ x: 116, y: 290 }, 500);

		let woman = BaseLoadBitmap.create("wifelovecucolorisview_woman")
		woman.width = 251;
		woman.height = 660;
		woman.setPosition(299, 412);
		this.addChildToContainer(woman);
		egret.Tween.get(woman).wait(200).to({ x: 286, y: 390 }, 1600).to({ x: 283, y: 381 }, 500);

		let left = BaseLoadBitmap.create("wifelovecucolorisview_left")
		left.width = 347;
		left.height = 1136;
		left.setPosition(-300, 0);
		this.addChildToContainer(left);
		egret.Tween.get(left).to({ x: -68 }, 300).to({ x: 0 }, 1800);

		let right = BaseLoadBitmap.create("wifelovecucolorisview_right")
		right.width = 340;
		right.height = 1136;
		right.setPosition(593, 0);
		this.addChildToContainer(right);
		egret.Tween.get(right).to({ x: 361 }, 300).to({ x: 294 }, 1800).call(() => {
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFELOVEANI_CLICK);
			// egret.Tween.get(this).to({ alpha: 0 }, 400).call(() => {
			// 	egret.Tween.removeTweens(this);
			this.closeView();
			// });
		}, this);





		// this.addTouchTap(this.closeView, this);
	}


	private closeView(): void {
		this.hide();
	}

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
		]);
	}


	protected getTitleBgName(): string {
		return null;
	}

	protected getTitleStr(): string {
		return null;
	}

	protected getBgName(): string {
		return null;
	}
	public dispose(): void {
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFELOVEANI_CLICK);
		super.dispose();
	}

}