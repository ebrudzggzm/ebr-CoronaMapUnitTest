import { getByRole, render, screen } from "@testing-library/react";
import Form from ".";
import userEvent from "@testing-library/user-event";

test("form gönderildiğinde detay sayfasına yönlendirir", async () => {
  //prop olarak gönderilen gönderilen fonksiyonlar test edilirken,mock func oluştur.
  const user = userEvent.setup();
  const mockFn = jest.fn();
  //test edilecek bileşni render et
  const { getByPlaceholderText,getByRole } = render(<Form handleSubmit={mockFn} />);

  //inputu çağır
  const input = getByPlaceholderText("Search For Country Name");

  await user.type(input, "Turkey");

  const button = getByRole('button');

  await user.click(button);
  expect(mockFn).toHaveBeenCalled();
});
