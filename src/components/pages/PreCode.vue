<template>
	<pre class="text-[0.8125rem] leading-6 text-gray-300" style="tab-size: 2">
<code>
<span style="color: #7dd3fc;">&lt;template&gt;</span>
  <span style="color: #7dd3fc;">&lt;div&gt;</span>
    <span style="color: #7dd3fc;">&lt;h1&gt;</span><span style="color: #42b883;">Nuxt3 Starter Template</span><span style="color: #7dd3fc;">&lt;/h1&gt;</span>
    <span style="color: #7dd3fc;">&lt;p&gt;</span><span style="color: #ffffff;">Move fast and break things! 🚀</span><span style="color: #7dd3fc;">&lt;/p&gt;</span>
    <span style="color: #7dd3fc;">&lt;button</span> <span style="color: #7dd3fc;">@click</span><span style="color: #ffffff;">="launch"</span><span style="color: #7dd3fc;">&gt;</span><span style="color: #ffffff;">Launch the Rocket!</span><span style="color: #7dd3fc;">&lt;/button&gt;</span>
    <span style="color: #7dd3fc;">&lt;p</span> <span style="color: #7dd3fc;">v-if</span><span style="color: #ffffff;">="launched"</span><span style="color: #7dd3fc;">&gt;</span><span style="color: #ffffff;">🚀 Rocket Launched! 🌕</span><span style="color: #7dd3fc;">&lt;/p&gt;</span>
  <span style="color: #7dd3fc;">&lt;/div&gt;</span>
<span style="color: #7dd3fc;">&lt;/template&gt;</span>

<span style="color: #7dd3fc;">&lt;script setup&gt;</span>
  <span style="color: #7dd3fc;">import</span> <span style="color: #7dd3fc;">{</span> <span style="color: #ffffff;">ref</span> <span style="color: #7dd3fc;">}</span> <span style="color: #7dd3fc;">from</span> <span style="color: #42b883;">'vue'</span>;
  <span style="color: #7dd3fc;">const</span> <span style="color: #ffffff;">launched</span> <span style="color: #7dd3fc;">=</span> <span style="color: #ffffff;">ref(false)</span>;

  <span style="color: #7dd3fc;">function</span> <span style="color: #ffffff;">launch</span>() {
    <span style="color: #ffffff;">launched.value = true</span>;
    <span style="color: #42b883;">console.log</span>(<span style="color: #42b883;">'The rocket has launched!'</span>);
  }
<span style="color: #7dd3fc;">&lt;/script&gt;</span>
</code>
</pre>
</template>

<script></script>

<style lang="scss" scoped></style>
