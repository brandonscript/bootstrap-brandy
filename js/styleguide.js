var beautify_html = require('js-beautify').html

$('document').ready(function() {
    buildCodeExamples()
})

function buildCodeExamples() {
    var counter = 0
    $('.sg-markup').each(function() {
        var code = $(this).find('.sg-code-example').html()
        $(this).append('<div class="sg-markup-controls"><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse' + counter + '">View Source </button><a class="sg-btn--top" href="#top">Back to Top</a></div>')
        $(this).append('<div class="sg-source collapse in" id="collapse' + counter + '"><button class="btn btn-default sg-btn--select" href="#">Copy Source</button><pre class="linenums sg-code-example-output"><code class="html"></code></pre></div>')
        $(this).find('.sg-code-example-output code').text(beautify_html(code, {
            indent_size: 4
        }))
    })
}

function buildColorPalette() {
    $.getJSON("https://api.brand.ai/styleguide/apigee/style/style-data?key=SygBf9LAb", function(data) {
        $.each(data.colors, function(palette) {
            $('.sg-colors').append('<h4>' + palette.name + '</h4>')
            $.each(palette.colors, function(color) {
                $('.sg-colors').append('<div class="sg-color sg-lg" style="background-color: ' + color.value + '"><span class="sg-color-swatch"><span class="sg-animated">' + color.value + '</span></span></div>')
            })
        });
    });
}



// <a class="btn btn-primary sg-btn sg-btn--source" href="#collapseAddress" data-toggle="collapse">View Source</a> <a class="sg-btn--top" href="#top">Back to Top</a> </div>
//         <div class="sg-source sg-animated">
//           <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseAddress">
//             View Source
//           </button>
//           <a class="btn btn-default sg-btn sg-btn--select" href="#">Copy Source</a>

// <code>&lt;address&gt;
//   &lt;strong&gt;Twitter, Inc.&lt;/strong&gt;&lt;br&gt;
//   795 Folsom Ave, Suite 600&lt;br&gt;
//   San Francisco, CA 94107&lt;br&gt;
//   &lt;abbr title=&quot;Phone&quot;&gt;P:&lt;/abbr&gt; (123) 456-7890
// &lt;/address&gt;

// &lt;address&gt;
//   &lt;strong&gt;Full Name&lt;/strong&gt;&lt;br&gt;
//   &lt;a href=&quot;mailto:#&quot;&gt;first.last@example.com&lt;/a&gt;
// &lt;/address&gt;</code></pre>

// <h4>Main Colors</h4>
// <div class="sg-color sg-brand-primary sg-lg"><span class="sg-color-swatch"><span class="sg-animated">#57DAE6</span></span>
// </div>
// <div class="sg-color sg-gray-lighter sg-lg"><span class="sg-color-swatch"><span class="sg-animated">#57DAE6</span></span>
// </div>
// <div class="sg-color sg-gray-light sg-lg"><span class="sg-color-swatch"><span class="sg-animated">#57DAE6</span></span>
// </div>
// <div class="sg-color sg-gray sg-lg"><span class="sg-color-swatch"><span class="sg-animated">#57DAE6</span></span>
// </div>
// <div class="sg-color sg-gray-dark sg-lg"><span class="sg-color-swatch"><span class="sg-animated">#4dd3c9</span></span>
// </div>
// <div class="sg-color sg-gray-darker sg-lg"><span class="sg-color-swatch"><span class="sg-animated">#339db0</span></span>
// </div>

// <h4>Complementary Colors</h4>
// <div class="sg-color sg-brand-success"><span class="sg-color-swatch"><span class="sg-animated">#384355</span></span>
// </div>
// <div class="sg-color sg-brand-warning"><span class="sg-color-swatch"><span class="sg-animated">#384355</span></span>
// </div>
// <div class="sg-color sg-brand-danger"><span class="sg-color-swatch"><span class="sg-animated">#384355</span></span>
// </div>
// <div class="sg-color sg-brand-info"><span class="sg-color-swatch"><span class="sg-animated">#384355</span></span>
// </div>