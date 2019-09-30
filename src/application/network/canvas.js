import uuidv4 from 'uuid/v4';
export const template = `
<div class="heading-canvas">
  <div class="heading-canvas__user">
      <div class="heading-canvas__user-image">
      <div class="circle-picture-item" style="width: 64px; height: 64px; border-radius: 60px;">
        <img class="circle-picture-item__image" src="https://pbs.twimg.com/profile_images/1175304215427612672/azlHuabi_400x400.jpg" alt="" style="width: 64px; height: 64px; border-radius: 60px;">
      </div>
    </div>
    <div class="heading-canvas__user-title">
      佐藤健さんの「チャームポイント」
    </div>
  </div>
</div>
`;

export function blobToFile(theBlob) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = theBlob.type == 'image/png' ? uuidv4() + '.png' : uuidv4();
    return theBlob;
}

export const get_template_shot = () => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = template;
    const dom = wrapper.firstChild;
    console.log(wrapper);
    var target = wrapper.getElementsByClassName('heading-canvas')[0];
    const domtoimage = require('dom-to-image');
    domtoimage.toPng(target).then(dataUrl => {
        const img = new Image();
        img.src = dataUrl;
        document.body.appendChild(img);
    });
};

export const get_shot_by_url = async className => {
    if (!process.env.BROWSER) return false;
    const domtoimage = require('dom-to-image');
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByClassName(className)[0];
    const data = await domtoimage.toBlob(g);
    return data && blobToFile(data);
    // const img = new Image();
    // img.src = dataUrl;
    // document.body.appendChild(img);
};

module.exports = {
    template,
    get_template_shot,
    get_shot_by_url,
};
