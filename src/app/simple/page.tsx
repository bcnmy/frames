import {
  FrameContainer,
  FrameImage,
  FrameButton,
  useFramesReducer,
  getPreviousFrame,
  validateActionSignature,
} from "frames.js/next/server";

const reducer = (state: any) => ({ count: state.count + 1 });

const CONSTANTS = {
  DASHBOARD_URL: "https://dashboard.biconomy.io",
  DOCS_URL: "https://dashboard.biconomy.io",
};

export default async function Page(props: {
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const previousFrame = getPreviousFrame(props.searchParams);

  await validateActionSignature(previousFrame.postBody);

  const [state, dispatch] = useFramesReducer(
    reducer,
    { count: 0 },
    previousFrame,
  );

  return (
    <>
      <FrameContainer
        postUrl="https://www.biconomy.io"
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage src="/biconomy_orange_centred.png" />
        <FrameButton href={CONSTANTS.DASHBOARD_URL}>Dashboard</FrameButton>
        <FrameButton href={CONSTANTS.DOCS_URL}>Docs</FrameButton>
      </FrameContainer>
    </>
  );
}
