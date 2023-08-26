let toolbaroptions = [

    //text style
    ["bold", "italic", "underline", "stroke"],

    //header for text eg h1, h2
    [{header:[1,2,3,4,5,6,false]}],

    //bullet points style
    [{list:"ordered"}, {list:"bullet"}],

    // sub and super script 
    [{script: "super"}, {script:"sub"}],

    //indentation
    [{indent:"+1"}, {indent:"-1"}],

    //alignment
    [{align:[]}],

    // adding image, video and link
    ["image", "video", "link", "formula"],

    //adding fornt family
    [{font:[]}]
]

let quill = new Quill("#editor", {
    modules: {
        toolbar: toolbaroptions,
    },
    theme: "snow"
})