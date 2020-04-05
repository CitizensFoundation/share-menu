# \<cr-card\>

A custom element that automatically generates a Clash Royale card inside a canvas.

Basic example:

<!---
```
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="cr-card-property.html">
    <link rel="import" href="cr-card.html">
    <style is="custom-style">
      cr-card {
        width: 100%;
        height: auto;
      }
    </style>
    <div class="container">
      <next-code-block></next-code-block>
    </div>
  </template>
</custom-element-demo>
```
-->
```html
<cr-card
    card-name="Simple CR Card Demo"
    description="This really basic demo shows how easy it is to generate a Clash Royale card using Web Components.">
  <cr-card-property title="HP" value="100" icon="hp"></cr-card-property>
</cr-card>
```
