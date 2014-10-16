(function () {
    'use strict';
    requestAnimationFrame(AnimationFrame);
    var canvasElement = document.getElementById("canvas"),
        //926 600
        renderer = PIXI.autoDetectRenderer(1204, 900, canvasElement, false, false),
        stage = new PIXI.Stage(0x0, true),
        imgDir = "imgs/";
    var transparentTexture = textureFromImage('transparent_1x1.gif'),
        mainPageTexture = textureFromImage("floorplan_mod.jpg"),
        kitchenTexture = textureFromImage("kitchen_mod.jpg"),
        livingRoomTexture = textureFromImage("livingroom_mod.jpg"),
        backgroundSprite = new PIXI.Sprite(transparentTexture);


    stage.addChild(backgroundSprite);
    PIXI.Sprite.prototype.buttonMode = true;

    function textureFromImage(imageName) {
        return PIXI.Texture.fromImage(imgDir + imageName);
    };

    function AnimationFrame() {
        requestAnimationFrame(AnimationFrame);
        renderer.render(stage);
    }

    function overSprite(textureImage, position) {
        var self = this;
        this.texture = textureFromImage(textureImage);
        this.sprite = new PIXI.Sprite(transparentTexture);
        this.isMouseOver = false;
        this.buttonMode = true;
        this.defaultCursor = "crosshair";
        if (this.texture.baseTexture.hasLoaded) {
            this.sprite.scale = new PIXI.Point(this.texture.width, this.texture.height);
        } else {
            this.texture.baseTexture.addEventListener('loaded', function () {
                if (!self.isMouseOver) {
                    self.sprite.scale = new PIXI.Point(self.texture.width, self.texture.height);
                }
            });
        }


        this.sprite.setInteractive(true);
        //this.sprite.hitArea = new PIXI.Rectangle(position.x, position.y, size.x, size.w);
        this.sprite.mouseover = function (event) {
            self.isMouseOver = true;
            self.sprite.setTexture(self.texture);
            self.sprite.scale = new PIXI.Point(1, 1);
        }
        this.sprite.mouseout = function (event) {
            self.isMouseOver = false;
            self.sprite.setTexture(transparentTexture);
            self.sprite.scale = new PIXI.Point(self.texture.width, self.texture.height);

        }
        this.sprite.position = position;
    };

    function emptyStage() {
        var children = [].concat(stage.children);
        for (var i = 1, len = children.length; i < len; ++i) {
            stage.removeChild(children[i]);
        }
    }
    window.onpopstate = function(event) {
        if(event.state) 
            actuallyChangeStage(event.state);
        else
            actuallyChangeStage("");
    }
    function actuallyChangeStage(Room) {
        if (stage.children.length > 0) {
            emptyStage();
        }

        location.hash = Room;
        switch (Room) {
        case "#LivingRoom":
            LivingRoom();
            break;
        case "#Kitchen":
            Kitchen();
            break;
        default:
            MainPage();
            break;
        }
    }
    function changeStage(Room) {
        
        history.pushState(location.hash, location.hash.substr(1), location.toString());

        
    }
    //176, 390
    //192, 720
    //643 - 178
    //980
    //160
    //647, 420
    function createHitArea(scale, position, mousedown) {
        var sprite = new PIXI.Sprite(transparentTexture);
        sprite.scale = scale;
        sprite.position = position;
        sprite.mousedown = mousedown;
        sprite.setInteractive(true);
        sprite.buttonMode = true;
        return sprite;
    }
    
    function MainPage() {
        backgroundSprite.setTexture(mainPageTexture);
        var scale = new PIXI.Point(1204, 450);
        stage.addChild(createHitArea(scale, new PIXI.Point(0, 450), changeStage.bind(this, "#LivingRoom")));
        stage.addChild(createHitArea(scale, new PIXI.Point(0, 0), changeStage.bind(this, "#Kitchen")));

    }

    function Kitchen() {

        backgroundSprite.setTexture(kitchenTexture);


        window.tSprite = new overSprite('toaster_mod.gif', new PIXI.Point(917, 206));
        window.fSprite = new overSprite('faucet_mod.gif', new PIXI.Point(361, 291));
        window.spSprite = new overSprite('stove_pot_mod.gif', new PIXI.Point(710, 217));
        //window.ufsprite2 = new unhappyFaceSprite(new PIXI.Point(555, 315));
        //ufsprite2.sprite.scale = new PIXI.Point(1.5, 1.5);
        //window.ufsprite3 = new unhappyFaceSprite(new PIXI.Point(555, 150));

        stage.addChild(fSprite.sprite);
        stage.addChild(tSprite.sprite);
        stage.addChild(spSprite.sprite);
        
        
        window.bSprite = new PIXI.Text("Go Back");
        bSprite.interactive = true;
        bSprite.mousedown = changeStage.bind(this, "#MainPage");
        bSprite.buttonMode = true;
        stage.addChild(bSprite);
                

    }

    function LivingRoom() {
        backgroundSprite.setTexture(livingRoomTexture);

        window.fpSprite = new overSprite('fireplace_mod.gif', new PIXI.Point(34, 400));
        window.cSprite = new overSprite('candles_mod.gif', new PIXI.Point(505, 446));
        //window.ufsprite2 = new unhappyFaceSprite(new PIXI.Point(555, 315));
        //ufsprite2.sprite.scale = new PIXI.Point(1.5, 1.5);
        //window.ufsprite3 = new unhappyFaceSprite(new PIXI.Point(555, 150));
        stage.addChild(fpSprite.sprite);
        stage.addChild(cSprite.sprite);
        
        window.bSprite = new PIXI.Text("Go Back");
        bSprite.interactive = true;
        bSprite.mousedown = changeStage.bind(this, "#MainPage");
        bSprite.buttonMode = true;
        stage.addChild(bSprite);
    }
    //stage.addChild(ufsprite3.sprite);


    renderer.render(stage);
    changeStage(location.hash);
    window.stage = stage;
    window.renderer = renderer;

}());
