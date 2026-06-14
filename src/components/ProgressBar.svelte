<script lang="ts">
let progress = $state(0);
let visible = $state(false);
let animating = $state(false);

function startProgress() {
	visible = true;
	progress = 0;
	animating = true;

	const tick = () => {
		if (!animating) return;
		const increment = (0.9 - progress) * 0.08;
		if (increment > 0.001) {
			progress += increment;
			requestAnimationFrame(tick);
		} else {
			progress = 0.9;
			animating = false;
		}
	};
	requestAnimationFrame(tick);
}

function completeProgress() {
	animating = false;
	progress = 1;
	setTimeout(() => {
		visible = false;
		progress = 0;
	}, 400);
}

function setupSwupHooks() {
	if (window.swup?.hooks) {
		window.swup.hooks.on("visit:start", () => startProgress());
		window.swup.hooks.on("visit:end", () => completeProgress());
	}
}

$effect(() => {
	if (window.swup?.hooks) {
		setupSwupHooks();
	} else {
		document.addEventListener("swup:enable", setupSwupHooks, { once: true });
	}

	startProgress();
	if (document.readyState === "complete") {
		completeProgress();
	} else {
		window.addEventListener("load", () => completeProgress(), { once: true });
	}
});
</script>

{#if visible}
  <div class="progress-bar-container">
    <div
      class="progress-bar"
      class:complete={progress >= 1}
      style="width: {progress * 100}%"
    ></div>
  </div>
{/if}

<style>
  .progress-bar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: 99999;
    pointer-events: none;
  }

  .progress-bar {
    height: 100%;
    background-color: var(--primary);
    transition: width 200ms ease-out;
    box-shadow: 0 0 8px var(--primary);
    border-radius: 0 1px 1px 0;
  }

  .progress-bar.complete {
    width: 100% !important;
    transition:
      width 120ms ease-out,
      opacity 250ms ease-in;
    opacity: 0;
  }
</style>
