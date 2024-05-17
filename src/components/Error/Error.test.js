import userEvent from "@testing-library/user-event";
import Error from ".";
import { render, screen } from "@testing-library/react";

describe("error bileşeni testleri", () => {
  const user = userEvent.setup();
  const mockFn = jest.fn();
  let errorComponent;
  beforeEach(() => {
    errorComponent = render(
      <Error message={"Failed with status code of 404"} retry={mockFn} />
    );
  });

  it(" doğru hata mesajı gösterir.", () => {
    errorComponent.getByText(/failed with/i);
  });

  it("retry butonu çalışır.", async () => { 

    const button = errorComponent.getByRole("button");
    await user.click(button);
    expect(mockFn).toHaveBeenCalled();
  });
});

// beforeEach(()=>{}); //her birinden önce
// afterEach(()=>{}); //her birinden sonra

// beforeAll(()=>{}); //tüm testlerden önce bir kere
// afterAll(()=>{}); //tüm testlerden sonra bir kere
